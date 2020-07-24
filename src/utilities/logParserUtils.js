import { v4 as uuidv4 } from 'uuid';

import LogEntry from 'classes/LogEntry';

import REGEX, {EMPTY_LINES_REGEX} from 'constants/regexes';

const logId = uuidv4();
const PARSE_DELAY = 10; // ms

/**
 * core parsing handler - start here
 * 
 * @param {String} rawText
 * @return {Array<LogEntry>}
 */
export async function parseLogTxt(rawText) {
  try {
    const rawCleaned = cleanRawLog(rawText);
    const rawSize = rawCleaned.length;
    if (rawSize > 10000000) {
      throw new Error(`This log of ${rawSize} characters is too huge!`);
    }

    const preparsedLog = preparseRawLog(rawCleaned);

    // separate entry strings into individual arrays
    const rawArray = preparsedLog
      .replace(EMPTY_LINES_REGEX, '}{')
      .split('}{');
    if (rawArray.length <= 1) {
      throw new Error('Not enough data on log.');
    }

    const BATCH_SIZE = calculateBatchSize(rawSize);
    console.log(`(log has ${rawSize} characters)`);

    const logEntries = await parseRawArray(rawArray, {batchSize: BATCH_SIZE});
    return logEntries;

  } catch (e) {
    return e;
  }
}
/** 
 * parses an array of raw strings
 * @param {Array<String>} rawArray
 * @param {Object} [options]
 * @returns {Array<LogEntry>}
 */
export async function parseRawArray(rawArray, options = {}) {
  const {
    batchSize = 100,
  } = options;

  let logEntries = [];

  // calculate size of batches for performance
  const batchCount = Math.ceil(rawArray.length / batchSize);
  for (let i = 0; i < batchCount; i++) {
    const startIdx = i * batchSize;
    const endIdx = startIdx + batchSize;
    const logGroup = rawArray.slice(startIdx, endIdx);
    const parsedGroup = await parseLogArray(logGroup, startIdx);

    logEntries = logEntries.concat(parsedGroup);
    console.log(`... Batch #${i+1} parsed (${parsedGroup.length} entries)`);
  }

  return logEntries;
}
/** 
 * creates a list of LogEntry class, 
 *  which will have parsed an entry's data 
 * 
 * @async
 * @param {Array<String>} logArray
 * @param {Number} startIdx
 * @returns {Array<LogEntry>}
 */
export function parseLogArray(logArray, startIdx) {
  return new Promise((resolve) => {
    const parsedLogArray = logArray.map((rawText, idx) => new LogEntry({
      entryIdx: startIdx + idx,
      entryId: `${startIdx + idx}_${logId}`,
      rawText: rawText,
    }));

    setTimeout(() => resolve(parsedLogArray), PARSE_DELAY);
  })
}
/**
 * do some stuff before splitting up the entries
 * @param {String} rawText
 * @return {String}
 */
export function preparseRawLog(rawText) {
  const regexToPreparse = [
    REGEX.GROUP.MOON_SNAPSHOT,
    REGEX.GROUP.STATUS_SNAPSHOT,
    REGEX.GROUP.EQUIPMENT_SNAPSHOT,
    REGEX.GROUP.SKILLS_SNAPSHOT,
    REGEX.GROUP.EFFECTS_SNAPSHOT,
    REGEX.GROUP.MODIFIERS_SNAPSHOT,
  ];

  return regexToPreparse.reduce((preparsedLog, preparseRegex) => {
    const preparsedString = preparsedLog.match(preparseRegex)[0].replace(EMPTY_LINES_REGEX, '\n');
    return preparsedLog.replace(preparseRegex, preparsedString);
  }, rawText);
}
/**
 * remove stuff that the parser will be completely ignoring
 * @param {String} rawText
 * @return {String}
 */
export function cleanRawLog(rawText) {
  return rawText
    .replace(REGEX.MISC.STACK_TRACE, '')
    .replace(REGEX.MISC.EMPTY_CHECKPOINT, '')
    .replace(REGEX.MISC.COMBAT_MACRO, '')
    .replace(REGEX.MISC.MAFIA_CHOICE_URL, '')
    .replace(REGEX.MISC.MAFIA_MAXIMIZER, '');
}
/**
 * update batch size based on number of characters in the log
 *  this calculation is not very scientific
 *  
 * @param {Number} rawSize
 */
function calculateBatchSize(rawSize) {
  const rawVal = Math.sqrt(rawSize);
  const newBatchSize = Math.round(1200 - rawVal);
  return Math.max(100, newBatchSize);
}
