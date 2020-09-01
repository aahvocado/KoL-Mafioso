import {observable} from 'mobx';

import Batcher from 'classes/Batcher';

import {FILTER_DELAY, PAGINATE_DELAY} from 'constants/DEFAULTS';
import REGEX from 'constants/REGEXES';
import {DEFAULT_CATEGORIES_VISIBLE} from 'constants/filterList';

import * as logStoreHelper from 'helpers/logStoreHelper';

import chartStore from 'store/chartStore';

import * as fileParserUtils from 'utilities/fileParserUtils';
import * as logParserUtils from 'utilities/logParserUtils';
import * as regexUtils from 'utilities/regexUtils';
import {hashCode} from 'utilities/hashUtils';

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
    /** @type {String} */
    this.rawText = undefined;

    /** @type {Boolean} */
    this.isAscensionLog = false;
    /** @type {AscensionAttributes} */
    this.ascensionAttributes = {
      /** @type {String} */
      characterName: undefined,
      /** @type {String} */
      className: undefined,
      /** @type {Number} */
      ascensionNum: undefined,
      /** @type {AscensionDifficulty} */
      difficultyName: undefined,
      /** @type {String} */
      pathName: undefined,
      /** @type {Array<String>} */
      dateList: [],
      /** @type {Array<String>} */
      voterMonsters: [],
    }

    /**
     * literally all the entries
     * @type {ObservableArray<Entry>}
     */
    this.allEntries = observable([]);
    /**
     * entries that pass the current filters
     * @type {ObservableArray<Entry>}
     */
    this.validEntries = observable([]);
    /**
     * entries that are currently displayed on the page
     * @type {ObservableArray<Entry>}
     */
    this.currentEntries = observable([]);
    /** @type {Object} */
    this.displayOptions = observable({
      /** @type {Number|'all'} */
      dayNumFilter: 'all',
      /** @type {Number} */
      pageNum: 0,
      /** @type {Number} */
      entriesPerPage: 110,
      /** @type {Array<CategoryId>} */
      categoriesVisible: DEFAULT_CATEGORIES_VISIBLE.slice(),
      /** @type {Array<EntryAttribute>} */
      filteredAttributes: [],
    });

    /** @type {Batcher} */
    this.logBatcher = undefined;

    /** @type {Observable<Boolean>} */
    this.isParsing = observable.box(false);
    /** @type {Observable<Boolean>} */
    this.isFetching = observable.box(false);
    /** @type {Observable<Boolean>} */
    this.isLazyLoading = observable.box(false);
  }
  /**
   * @returns {String}
   */
  export() {
    return this.allEntries.map((entry) => entry.export()).join('\n\n');
  }
  /** @type {String} */
  get logHash() {
    if (this.ascensionAttributes.dateList.length <= 0) {
      return undefined;
    }

    const date = this.findMatcher(REGEX.SNAPSHOT.REAL_DATE);
    if (date === null) {
      console.error('Unable to create hash because there is no date in this log.');
      return undefined;
    }

    const sessionDate = Date.parse(date);
    const hashText = `${this.characterName}${sessionDate}${this.difficultyName}${this.pathName}`;
    return hashCode(hashText);
  }
  /** @type {Boolean} */
  get hasFiles() {
    return this.srcFiles.length > 0;
  }
  /** @type {Boolean} */
  get isReady() {
    return !this.isLoading && this.hasParsedEntries;
  }
  /** @type {Boolean} */
  get isLoading() {
    return this.isParsing.get() || this.isFetching.get() || this.isLazyLoading.get();
  }
  /** @type {Boolean} */
  get canFetch() {
    if (!this.hasParsedEntries) {
      return false;
    }

    if (this.logBatcher === undefined) {
      return false;
    }

    return true;
  }
  // -- log data
  /** @type {Boolean} */
  get hasRawText() {
    return this.rawText !== undefined;
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
  get allEntriesCount() {
    return this.allEntries.length;
  }
  /** @type {Number} */
  get validEntriesCount() {
    return this.validEntries.length;
  }
  /** @type {Number} */
  get currentEntriesCount() {
    return this.currentEntries.length;
  }
  // -- ascension attributes
  /** @type {String} */
  get characterName() {
    return this.ascensionAttributes.characterName;
  }
  /** @type {String} */
  get className() {
    return this.ascensionAttributes.className;
  }
  /** @type {Number} */
  get dayCount() {
    return this.ascensionAttributes.dateList.length;
  }
  /** @type {Number} */
  get turnCount() {
    if (!this.isAscensionLog) return 0;

    const checkEntries = this.allEntries.slice();
    let poppedEntry = checkEntries.pop();
    while (typeof poppedEntry.turnNum !== 'number' && checkEntries.length > 0) {
      poppedEntry = checkEntries.pop();
    }

    return poppedEntry.turnNum;
  }
  /** @type {Number} */
  get ascensionNum() {
    return this.ascensionAttributes.ascensionNum;
  }
  /** @type {String} */
  get difficultyName() {
    return this.ascensionAttributes.difficultyName;
  }
  /** @type {String} */
  get pathName() {
    return this.ascensionAttributes.pathName;
  }
  /** @type {String} */
  get pathLabel() {
    return logParserUtils.createPathLabel(this.rawText);
  }
  /** @type {Boolean} */
  get hasAscensionNum() {
    return this.ascensionNum !== undefined;
  }
  /** @type {Boolean} */
  get hasCharacterName() {
    return this.characterName !== undefined;
  }
  // -- display options
  /** @type {Number} */
  get isUsingDayFilter() {
    return this.displayOptions.dayNumFilter !== 'all';
  }
  /** @type {Number} */
  get currentDayNum() {
    return this.displayOptions.dayNumFilter;
  }
  /** @type {Number} */
  get currentPageNum() {
    return this.displayOptions.pageNum;
  }
  /** @type {Array<EntryType>} */
  get categoriesVisible() {
    return this.displayOptions.categoriesVisible;
  }
  /** @type {Array<EntryAttribute>} */
  get filteredAttributes() {
    return this.displayOptions.filteredAttributes;
  }
  /** @type {Number} */
  get isOnFirstPage() {
    return this.currentPageNum === 0;
  }
  /** @type {Number} */
  get isOnLastPage() {
    return this.currentPageNum === this.calculateLastPageIdx();
  }
  // -- uploading
  /**
   * clear stored data
   */
  reset() {
    this.srcFiles = [];
    this.srcRawTexts = [];
    this.allEntries.clear();
    this.validEntries.clear();

    this.isAscensionLog = false;
    this.ascensionAttributes = {
      characterName: undefined,
      className: undefined,
      ascensionNum: undefined,
      difficultyName: undefined,
      pathName: undefined,
      dateList: [],
    };

    this.displayOptions = observable({
      dayNumFilter: 'all',
      pageNum: 0,
      entriesPerPage: 100,
      categoriesVisible: this.displayOptions.categoriesVisible.slice(),
      filteredAttributes: this.displayOptions.filteredAttributes.slice(),
    });

    //
    chartStore.allEntries = [];
  }
  /**
   * find attributes that are specifically related to a full ascension log
   * @returns {AscensionAttributes}
   */
  setAscensionAttributes() {
    if (!this.isAscensionLog) {
      console.warn('We are parsing for Ascension but it is not determined to be an ascension log');
    }

    if (this.hasRawText) {
      this.ascensionAttributes = {
        ...this.ascensionAttributes,
        ...logParserUtils.parseAscensionAttributes(this.rawText),
      };
    }

    return this.ascensionAttributes;
  }
  /**
   * directly giving a full log
   * @param {String} logText
   */
  async importLog(logText) {
    this.isParsing.set(true);

    try {
      this.reset();

      await this.prepareLog(logText);

      this.parse();

    } catch (e) {
      console.error(e);
      this.isParsing.set(false);
    }
  }
  /**
   * @param {FileList} files
   */
  async handleUpload(files) {
    try {
      if (files.length > 10) {
        throw new Error('Uploading way too many files.');
      }

      console.log(`%c☌ Checking ${files.length} files...`, 'color: #6464ff');
      this.isParsing.set(true);

      this.reset();

      // sort files by kolmafia's date
      const sortedFiles = fileParserUtils.sortBySessionDate(files);
      this.srcFiles = sortedFiles;

      // get text from all files
      this.srcRawTexts = await Promise.all(sortedFiles.map(fileParserUtils.readFile));
      if (this.srcRawTexts.length <= 0) {
        console.error('It looks like none of those files were valid, mate.');
        this.isParsing.set(false);
        return;
      }

      // combine all the text from the files and clean it up
      const allText = this.srcRawTexts.join('\n\n');
      await this.prepareLog(allText);

      // raw data gotten, now parse it to create individual entries
      this.parse();

    } catch (e) {
      console.error(e);
      this.isParsing.set(false);
    }
  }
  /**
   * the full log is cleaned and all we need to do is clean it
   *  and glean any ascension attributes before parsing it
   * @param {String} logText
   */
  async prepareLog(logText) {
    // try to find out if there is a full ascension log,
    //  otherwise just use the first text we have
    const fullAscensionText = logParserUtils.findAscensionLog(logText);
    if (fullAscensionText !== null) {
      this.isAscensionLog = true;
      this.rawText = await logParserUtils.cleanRawLog(fullAscensionText);
      this.setAscensionAttributes();
      console.log(`✨ %cFound Ascension #${this.ascensionNum}!`, 'font-size: 14px');

    } else {
      this.rawText = await logParserUtils.cleanRawLog(logText);
      console.warn('No Ascension specific log was found.');
    }

    // clean up once more...
    this.rawText = await logParserUtils.postParseCleanup(this.rawText);
    return this.rawText;
  }
  /**
   * handle cleaning up and setting all the data
   */
  async parse() {
    try {
      if (!this.hasRawText) {
        throw new Error('No log to parse???');
      }

      console.log('Parsing your Session Log...');
      this.isParsing.set(true);

      const parsedData = await logParserUtils.parseLogTxt(this.rawText);
      const newData = this.combineEntries(parsedData);
      this.allEntries.replace(newData);

      chartStore.allEntries = newData;

      const additionalData = this.createEstimatedEntries(newData);
      this.allEntries.replace(additionalData);
      this.validEntries.replace([]);

      const estimatedBatchSize = Math.round(Math.sqrt(newData.length));
      this.logBatcher = new Batcher(newData, {batchSize: estimatedBatchSize});

      console.log(`✔️ Finished! Created ${this.allEntries.length} entries.`);
      this.displayOptions.pageNum = 0;
      this.isParsing.set(false);

      this.fetchEntries();

    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  /**
   * starting from allEntries[startIdx],
   *  looks for the next entry that matches given `attributesFilter`
   *
   * @param {Number} startIdx
   * @param {Object} [attributesFilter]
   * @returns {Entry}
   */
  findNextEntry(startIdx, attributesFilter) {
    if (this.allEntries.length <= 0) {
      return undefined;
    }

    // not a valid index
    if (!this.allEntries[startIdx]) {
      return undefined;
    }

    // there is nothing next
    if (startIdx + 1 > this.allEntries.length - 1) {
      return undefined;
    }

    // no attributesFilter is simple
    if (attributesFilter === undefined) {
      return this.allEntries[startIdx + 1];
    }

    const checkEntries = this.allEntries.slice(startIdx + 1, this.allEntries.length);
    return checkEntries.find((entry) => {
      const checkAttributeNames = Object.keys(attributesFilter);
      return !checkAttributeNames.some((attributeName) => {
        const entryAttributeValue = entry.findAttribute(attributeName);
        return entryAttributeValue !== attributesFilter[attributeName];
      })
    })
  }
  // -- fetch functions
  /**
   * @param {Object} options
   * @return {Array<Entry>}
   */
  async fetchEntries(options = {}) {
    if (!this.canFetch) {
      return;
    }

    const fullOptions = {
      ...this.displayOptions,
      ...options,
    };

    const {
      pageNum,
      entriesPerPage,
    } = fullOptions;

    this.isFetching.set(true);

    const validEntries = await this.fetchByFilter(fullOptions, false);
    this.validEntries.replace(validEntries);

    const isFilteredBeyondRange = pageNum < 0 || pageNum > this.calculateLastPageIdx(entriesPerPage);
    if (isFilteredBeyondRange) {
      fullOptions.pageNum = 0;
    }

    // can only continue to fetch by page if filter created entries
    if (this.validEntries.length > 0) {
      const pagedEntries = await this.fetchByPage(fullOptions, false);
      this.currentEntries.replace(pagedEntries);
    } else {
      this.currentEntries.replace([]);
    }

    // done
    this.onFetchDone(fullOptions);
    return this.currentEntries;
  }
  /**
   * @param {Object} options
   * @param {Boolean} [isFinal]
   * @return {Array<Entry>}
   */
  async fetchByFilter(options = {}, isFinal = false) {
    if (!this.canFetch) {
      return;
    }

    this.isFetching.set(true);

    // console.log('⏳ Fetching by filter...');
    const {
      dayNumFilter = this.displayOptions.dayNumFilter,
      categoriesVisible = this.displayOptions.categoriesVisible,
      filteredAttributes = this.displayOptions.filteredAttributes,
    } = options;

    // batch find entries that are in range and not hidden
    const validEntries = await this.logBatcher.run((entriesGroup) => {
      return entriesGroup.filter((entry) => {
        // check day
        if (dayNumFilter !== 'all') {
          if (entry.dayNum !== (dayNumFilter + 1)) {
            return false;
          }
        }

        // check visibleEntries list
        const isVisibleEntry = categoriesVisible.some((category) => entry.categories.includes(category));
        if (!isVisibleEntry) {
          return false;
        }

        // check chosen attributes
        const hasAllFilteredAttributes = !filteredAttributes.some(({attributeName, attributeValue}) => {
          const entryAttributeValue = entry.attributes[attributeName] || entry[attributeName];
          return entryAttributeValue !== attributeValue;
        });

        if (!hasAllFilteredAttributes) {
          return false;
        }

        return true;
      });
    }, {batchDelay: FILTER_DELAY});

    // filtering resulted in nothing
    if (validEntries.length <= 0) {
      console.log(`⌛ No results for filter.`);
      if (isFinal) {
        console.warn('fetchByFilter.final is not handled.');
      }
      return [];
    }

    // if marked as final, then go ahead and only filter to first page
    if (isFinal) {
      await this.fetchByPage({pageNum: 0});
    }

    // otherwise, here are all entries that are valid
    return validEntries;
  }
  /**
   * @param {Object} options
   * @param {Boolean} [isFinal]
   * @return {Array<Entry>}
   */
  async fetchByPage(options = {}, isFinal = false) {
    if (!this.canFetch) {
      return;
    }

    this.isFetching.set(true);

    const {
      pageNum = this.displayOptions.pageNum,
      entriesPerPage = this.displayOptions.entriesPerPage,
    } = options;

    // delay for a bit so the loader can show up
    await new Promise((resolve) => setTimeout(resolve, PAGINATE_DELAY));

    const startIdx = entriesPerPage === 'all' ? 0 : Math.min(entriesPerPage * pageNum, this.allEntriesCount);
    const endIdx = entriesPerPage === 'all' ? this.allEntriesCount : Math.min(startIdx + entriesPerPage, this.allEntriesCount);
    // console.log(`⏳ Getting page ${pageNum}... from ${startIdx} to ${endIdx}`);

    const pagedEntries = this.validEntries.slice(startIdx, endIdx);

    // done
    if (isFinal) {
      this.onFetchDone(options, pagedEntries);
    }
    return pagedEntries;
  }
  /**
   * @param {Object} options
   * @return {Array<Entry>}
   */
  async fetchEntriesAppended(options = {}) {
    if (!this.canFetch) {
      return;
    }

    this.isFetching.set(true);
    this.isLazyLoading.set(true);

    // const previousEntries = this.currentEntries.slice(Math.max(this.currentEntries.length - entriesPerPage - 15, 0), this.currentEntries.length);
    const previousEntries = this.currentEntries.slice();
    const fetchedEntries = await this.fetchByPage(options);
    const combinedEntries = previousEntries.concat(fetchedEntries);

    // done
    this.onFetchDone(options, combinedEntries);
    return this.currentEntries;
  }
  /**
   * @param {Object} options
   * @param {Array<Entry>} [newCurrentEntries]
   * @param {Array<Entry>} [newValidEntries]
   */
  onFetchDone(options = {}, newCurrentEntries, newValidEntries) {
    this.displayOptions = {
      ...this.displayOptions,
      ...options,
    };

    if (newCurrentEntries !== undefined) {
      this.currentEntries.replace(newCurrentEntries);
    }

    if (newValidEntries !== undefined) {
      this.validEntries.replace(newValidEntries);
    }

    this.isFetching.set(false);
    this.isLazyLoading.set(false);
  }
  /**
   * @param {Number} entriesPerPage
   * @returns {Number}
   */
  calculateLastPageIdx(entriesPerPage = this.displayOptions.entriesPerPage) {
    const lastPage = Math.ceil(this.validEntries.length / entriesPerPage) - 1;
    return Math.max(lastPage, 0);
  }
  // -- misc utility
  /**
   * @param {Matcher} matcher
   * @return {String|null}
   */
  findMatcher(matcher) {
    return regexUtils.findMatcher(this.rawText, matcher);
  }
  /**
   * @param {Number} dayNum
   * @return {String}
   */
  getVoterMonsterOnDay(dayNum) {
    return this.ascensionAttributes.voterMonsters[dayNum - 1];
  }
  // -- logStoreHelper.js wrappers
  /** @alias */
  combineEntries(...args) {
    return logStoreHelper.combineEntries(...args);
  }
  /** @alias */
  createEstimatedEntries(...args) {
    return logStoreHelper.createEstimatedEntries(...args);
  }
  /** @alias */
  downloadFullLog() {
    logStoreHelper.downloadFullLog();
  }
  /** @alias */
  createLogPayload() {
    return logStoreHelper.createLogPayload();
  }
}

/** export singleton */
const logStore = new LogStore();
export default logStore;
