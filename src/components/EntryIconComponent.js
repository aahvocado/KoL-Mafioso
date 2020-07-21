import React from 'react';

import ENTRY_TYPE from 'constants/entryType';

import { ReactComponent as CrossedSwordsSVG } from 'images/crossed-swords.svg';
import { ReactComponent as DigDugSVG } from 'images/dig-dug.svg';
import { ReactComponent as InfoSVG } from 'images/info.svg';
import { ReactComponent as SteakSVG } from 'images/steak.svg';
import { ReactComponent as SwapBagSVG } from 'images/swap-bag.svg';
import { ReactComponent as UncertaintySVG } from 'images/uncertainty.svg';

// import combineClassnames from 'utilities/combineClassnames';

/**
 * @param {EntryType} entryType
 * @returns {React.Component}
 */
function getEntryIcon(entryType) {
  switch(entryType) {
    case ENTRY_TYPE.ENCOUNTER.COMBAT:
      return CrossedSwordsSVG;

    case ENTRY_TYPE.ENCOUNTER.NONCOMBAT:
      return DigDugSVG;

    case ENTRY_TYPE.SNAPSHOT.ASCENSION_INFO:
      return InfoSVG;

    case ENTRY_TYPE.ACQUIRE_ITEM:
      return SwapBagSVG;

    case ENTRY_TYPE.TRANSACTION:
      return SteakSVG;

    case ENTRY_TYPE.UNKNOWN:
    default:
      return UncertaintySVG;
  }
}
/**
 * @returns {React.Component}
 */
export default function EntryIconComponent(props) {
  const {
    logEntry,
    ...otherProps
  } = props;

  const EntryIconComponent = getEntryIcon(logEntry.entryType);

  return (
    <EntryIconComponent {...otherProps} />
  )
}