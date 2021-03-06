import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ReactComponent as SteakSVG } from 'images/steak.svg';
import { ReactComponent as SwapBagSVG } from 'images/swap-bag.svg';

import ItemDisplay from 'components/ItemDisplay';

import combineClassnames from 'utilities/combineClassnames';

/** @returns {React.Component} */
export default function ItemChangesDisplay(props) {
  const {
    className,
    entry,
  } = props;

  const {attributes} = entry;
  const {
    acquiredItems,
  } = attributes;

  return (
    <div className={combineClassnames('flex-row flexwrap-yes adjacent-mar-t-3', className)}>
      { entry.hasMeatChanges &&
        <ItemDisplay 
          IconComponent={SteakSVG}
          className='mar-2'
          content={`${entry.createMeatDisplay()} meat`} />
      }

      { acquiredItems.map((itemName, idx) => (
        <ItemDisplay 
          IconComponent={SwapBagSVG}
          className='mar-2'
          content={`${itemName}`}
          key={`acquired-item-${uuidv4()}-${idx}-key`} />
      ))}
    </div>
  )
}