import React from 'react';
// import {observer} from 'mobx-react';
import {Link} from "react-router-dom";
import {withRouter} from "react-router";

import {LOG_VIS_URL, CHARTS_URL} from 'constants/PAGE_URLS';

import appStore from 'store/appStore';

// import DarkButton from 'components/DarkButton';
import LogoComponent from 'components/LogoComponent';

import combineClassnames from 'utilities/combineClassnames';

/** @returns {ReactComponent} */
export default withRouter(
function Navbar(props) {
  const {
    className,
    location,
  } = props;

  const pageName = location.pathname.split('/')[1];

  return (
    <div
      elementname='app-navbar'
      className={combineClassnames('pad-v-1 flex-row aitems-center', className)}>
      <LogoComponent />

      <div className='jcontent-end flex-auto flex-row mar-l-6'>
        <NavbarLink
          to={LOG_VIS_URL}
          isActive={pageName === 'visualizer'}
          disabled={!appStore.isReady}
          children='Visualizer'
          className='adjacent-mar-l-3' />

        <NavbarLink
          to={CHARTS_URL}
          isActive={pageName === 'charts'}
          disabled={!appStore.isReady}
          children='Charts'
          className='adjacent-mar-l-3' />
      </div>
    </div>
  )
})

function NavbarLink(props) {
  const {
    className,
    disabled,
    isActive,
    ...otherProps
  } = props;

  const activeClassname = isActive ? 'color-green-lighter' : (disabled ? 'color-grayer' : 'color-white');

  if (disabled || isActive) {
    return <div
      children={props.children}
      className={combineClassnames('pad-5 borradius-2', activeClassname, className)} />
  }

  return (
    <Link
      {...otherProps}
      className={combineClassnames('pad-5 borradius-2', activeClassname, className)} />
  )
}