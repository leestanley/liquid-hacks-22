import React from 'react';
import Link from 'next/link'

import Logo from './assets/logo.svg';
import PlayButton from './assets/playbutton.svg';
import EndButton from './assets/endbutton.svg';
import { useRouter } from 'next/router';

import styles from '../../../../styles/components/common/header/TopBar.module.scss';

const TopBar = (props) => {
  const router = useRouter();
  const path = router?.asPath;
  if (path.includes('/ingame')) {
    return (
      <div className={styles.container}>
        <Link href="/postgame">
          <img className={styles.logo} src={Logo} alt="Logo"/>
        </Link>
        <Link href="/postgame">
        <img className={styles.centerButton} src={EndButton} alt="End button"/>
      </Link>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <Link href="/">
        <img className={styles.logo} src={Logo} alt="logo"/>
      </Link>
      <Link href="/ingame">
        <img className={styles.centerButton} src={PlayButton} alt="Play button"/>
      </Link>
    </div>
  );
}

export default TopBar;