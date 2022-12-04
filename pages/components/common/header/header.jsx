import React from 'react';
import TopBar from './topbar.jsx';

import styles from '../../../../styles/components/common/header/Header.module.scss';

const Header = (props) => {
  return (
    <div className={styles.container}>
      <TopBar />
    </div>
  );
}

export default Header;