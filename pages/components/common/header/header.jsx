import React from 'react';
import NavBar from './navbar.jsx';
import TopBar from './topbar.jsx';

import styles from '../../../../styles/components/common/header/Header.module.scss';

const Header = (props) => {
  return (
    <div className={styles.container}>
      <TopBar clickEnd={props.clickEnd}/>
      <NavBar />
    </div>
  );
}

export default Header;