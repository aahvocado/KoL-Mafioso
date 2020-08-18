import React, {Fragment} from 'react';
import {observer} from 'mobx-react';

import appStore from 'store/appStore';

import EntryDisplayContainer from 'components/EntryDisplayContainer';
import HeaderDisplay from 'components/HeaderDisplay';

import combineClassnames from 'utilities/combineClassnames';

/**
 * @returns {React.Component}
 */
export default observer(
function LogEntryViewer(props) {
  const {
    className,
    entriesList = [],
    isUsingCompactMode,
  } = props;

  return (
    <div
      className={combineClassnames('width-full flex-col adjacent-mar-t-5', className)}>
      { entriesList.map((entry, idx) => {
        const currentDay = entry.attributes.dayNum;
        const previousEntry = idx >= 1 && entriesList[idx-1];
        const previousDay = previousEntry && previousEntry.attributes.dayNum;
        const shouldShowDayDisplay = previousDay !== undefined ? previousDay < currentDay : false;

        return (
          <Fragment key={`entry-display-${entry.id}-${idx}-key`}>
            { shouldShowDayDisplay &&
              <HeaderDisplay
                topContent={`Day ${currentDay}`}
                className='pad-3 adjacent-mar-t-1' />
            }

            <EntryDisplayContainer
              entry={entry}
              isUsingCompactMode={isUsingCompactMode}
              isDevMode={appStore.isDevMode.get()}
              className='visualizer-cell adjacent-mar-t-1' />
          </Fragment>
        )
      })}
    </div>
  )
})