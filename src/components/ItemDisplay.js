import React from 'react';

import { ReactComponent as SwapBagSVG } from 'images/swap-bag.svg';

import combineClassnames from 'utilities/combineClassnames';

/** @returns {React.Component} */
export default function ItemDisplay(props) {
  const {
    className,
    content,
    IconComponent = SwapBagSVG,
  } = props;

  return (
    <div
      className={combineClassnames('overflow-hidden bg-second-darker borradius-2 pad-v-6 pad-h-8 boxsizing-border flex-col-center position-relative', className)}>

      <div
        className='flex-none adjacent-mar-t-2 position-absolute'
        elementname='block-inner-icon'>
        <IconComponent style={{width: 20, height: 20}} />
      </div>

      <div className='fontsize-3 color-white zindex-1 talign-center flex-none'>
        {content}
      </div>
    </div>
  )
}