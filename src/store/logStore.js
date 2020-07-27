import {
  observable,
} from 'mobx';

import Batcher from 'classes/Batcher';
import LogEntry from 'classes/LogEntry';

import {DEFAULT_HIDDEN_ENTRIES} from 'constants/DEFAULTS';

import * as logParserUtils from 'utilities/logParserUtils';

/**
 * state and handler of the log data
 */
class LogStore {
  /** @default */
  constructor() {
    /** @type {Array<File>} */
    this.srcFiles = [];
    /** @type {Array<String>} */
    this.srcRawTexts = [];
    /** @type {ObservableArray<LogEntry>} */
    this.allEntries = observable([]);
    /** @type {ObservableArray<LogEntry>} */
    this.currentEntries = observable([]);
    /** @type {Object} */
    this.filterOptions = observable({
      /** @type {Number} */
      pageNum: 0,
      /** @type {Number} */
      entriesPerPage: 300,
      /** @type {Array<EntryType>} */
      hiddenEntryTypes: DEFAULT_HIDDEN_ENTRIES,
      /* @type {Object} */
      dataFilters: {},
    });

    /** @type {Batcher} */
    this.logBatcher = undefined;

    /** @type {Boolean} */
    this.isParsing = observable.box(false);
    /** @type {Boolean} */
    this.isFetching = observable.box(false);
  }
  /** @type {Boolean} */
  get isReady() {
    return !this.isParsing.get() && !this.isFetching.get() && this.hasParsedEntries;
  }
  /** @type {Boolean} */
  get hasFiles() {
    return this.srcFiles.length > 0;
  }
  /** @type {Boolean} */
  get hasRawText() {
    return this.srcRawTexts.length > 0;
  }
  /** @type {Boolean} */
  get hasParsedEntries() {
    return this.allEntries.length > 0 && this.logBatcher !== undefined;
  }
  /** @type {Boolean} */
  get hasCurrentEntries() {
    return this.currentEntries.length > 0;
  }
  /** @type {Number} */
  get entriesCount() {
    return this.allEntries.length;
  }
  /**
   * @param {FileList} files
   */
  async handleUpload(files) {
    this.isParsing.set(true);

    this.srcFiles = [];
    this.srcRawTexts = [];
    this.allEntries.clear();

    for (let i=0; i<files.length; i++) {
      const file = files[i];
      await new Promise((resolve) => {
        if (file.type !== 'text/plain') {
          console.error('Uploaded a non-text file.');
          resolve();
          return;
        }

        const fileReader = new FileReader();
        fileReader.onload = (readerEvt) => {
          const readResult = readerEvt.target.result;
          this.srcFiles.push(file);
          this.srcRawTexts.push(readResult);
          resolve(readResult);
        }
        
        fileReader.readAsText(file);
      });
    }

    this.parse();
  }
  /**
   * @param {File} file
   */
  handleUpload_legacy(file) {
    if (file.type !== 'text/plain') {
      console.error('That is not a text file mate.');
      return;
    }

    this.isParsing.set(true);

    this.allEntries.clear();
    // this.currentEntries.clear();

    this.srcFiles = file;
  }
  /**
   * @param {FileReader.Event} readerEvt
   */
  onReadComplete_legacy(readerEvt) {
    const txtString = readerEvt.target.result;
    this.rawText = txtString;
    this.parse();
  }
  /**
   * handle cleaning up and setting all the data
   */
  async parse() {
    if (!this.hasRawText) {
      throw new Error('No log to parse???');
    }

    console.log('✨ %cParsing your Session Log!', 'color: blue; font-size: 14px');
    this.isParsing.set(true);

    // const newData = await logParserUtils.parseLogTxt(this.rawText);
    const newData = await logParserUtils.parseLogTxt(this.srcRawTexts.join('\n\n'));
    this.allEntries.replace(newData);

    const estimatedBatchSize = Math.round(Math.sqrt(newData.length));
    this.logBatcher = new Batcher(newData, {batchSize: estimatedBatchSize});

    console.log(`✔️ %cFinished! Created ${this.allEntries.length} entries.`, 'color: blue');
    this.isParsing.set(false);

    // we just parsed so we gotta refresh `currentEntries`
    this.fetchEntries();
  }
  /** 
   * @param {Object} options
   * @return {Array<LogEntry>} 
   */
  async fetchEntries(options = {}) {
    if (!this.isReady) {
      return [];
    }

    const {
      pageNum = this.filterOptions.pageNum,
      entriesPerPage = this.filterOptions.entriesPerPage,
      hiddenEntryTypes = this.filterOptions.hiddenEntryTypes,
      // dataFilters = this.filterOptions.dataFilters,
    } = options;

    console.log('⏳ %cFetching entries...', 'color: blue')
    this.isFetching.set(true);

    const startIdx = entriesPerPage === 'all' ? 0 : Math.min(entriesPerPage * pageNum, this.entriesCount-1);
    const endIdx = entriesPerPage === 'all' ? this.entriesCount-1 : Math.min(startIdx + entriesPerPage, this.entriesCount-1);
    // console.log('I want entries from', startIdx, 'to', endIdx);

    // batch find entries that are in range and not hidden
    const filteredEntries = await this.logBatcher.run((entriesGroup) => {
      return entriesGroup.filter((logEntry) => {
        const withinSearchRange = logEntry.entryIdx >= startIdx && logEntry.entryIdx < endIdx;
        return withinSearchRange && !hiddenEntryTypes.includes(logEntry.entryType);
      });
    });
    
    const condensedEntries = this.condenseEntries(filteredEntries);
    this.currentEntries.replace(condensedEntries);

    console.log('⌛ %c...done.', 'color: blue')
    this.isFetching.set(false);

    return condensedEntries;
  }
  /**
   * currently the parameter passed isn't a shallow copy
   *  but it might be something to consider
   *
   * @param {Array<LogEntry>} entriesList 
   * @returns {Array<LogEntry>}
   */
  condenseEntries(entriesList) {
    const originalLength = entriesList.length;
    let condensedData = [];

    while (entriesList.length > 0) {
      const currEntry = entriesList.shift();
      if (entriesList.length <= 0) {
        condensedData.push(currEntry);
        continue;
      }

      const nextEntry = entriesList.shift();
      if (currEntry.canCombineWith(nextEntry)) {
        const combinedEntry = new LogEntry({
          entryId: currEntry.id,
          entryIdx: currEntry.entryIdx,
          rawText: currEntry.rawText.concat('\n\n').concat(nextEntry.rawText),
        });

        entriesList.unshift(combinedEntry);
        continue;
      }

      entriesList.unshift(nextEntry);
      condensedData.push(currEntry);
    }

    console.log(`%cCondensed entries from ${originalLength} to ${condensedData.length}`, 'color: #6464ff');
    return condensedData;
  }
}

/** export singleton */
const logStore = new LogStore();
export default logStore;