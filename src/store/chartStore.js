import {observable} from 'mobx';

import * as chartParserUtils from 'utilities/chartParserUtils';
import {createColorList_purplePastel} from 'utilities/colorUtils';

/**
 * state and handler of the chart data
 */
class ChartStore {
  constructor() {
    /**
     * literally all the entries
     * @type {ObservableArray<Entry>}
     */
    this.allEntries = [];
    /** @type {Observable<String>} */
    this.currentChartType = observable.box('meatTotal');
  }
  /** @type {ChartjsConfig | null} */
  get currentChartData() {
    switch(this.currentChartType.get()) {
      case 'location':
        return this.locationChartData;

      case 'familiar':
        return this.familiarChartData;

      case 'meatTotal':
        return this.meatTotalGainedChartData;

      default:
        return null;
    }
  }
  /** @type {ChartjsConfig} */
  get locationChartData() {
    if (this.entriesLength <= 0) {
      return null;
    }

    return chartParserUtils.createLocationData(this.allEntries.slice(), createColorList_purplePastel);
  }
  /** @type {ChartjsConfig} */
  get familiarChartData() {
    if (this.entriesLength <= 0) {
      return null;
    }

    return chartParserUtils.createFamiliarData(this.allEntries.slice(), createColorList_purplePastel);
  }
  /** @type {ChartjsConfig} */
  get meatTotalGainedChartData() {
    if (this.entriesLength <= 0) {
      return null;
    }

    return chartParserUtils.createMeatTotalGainedData(this.allEntries.slice(), createColorList_purplePastel);
  }
  // --
  /** @type {Boolean} */
  get isReady() {
    return this.entriesLength > 0;
  }
  /** @type {Number} */
  get entriesLength() {
    return this.allEntries.length;
  }
  /** @type {Number} */
  get hasEnoughEntries() {
    return this.allEntries.length > 2;
  }
  // --
  /**
   * @param {String} chartType
   */
  onSwitchCurrentChart(chartType) {
    this.currentChartType.set(chartType);
  }
}
/** export singleton */
export default new ChartStore();