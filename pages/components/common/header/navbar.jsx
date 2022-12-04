import React from 'react';
import Link from 'next/link';

import styles from '../../../../styles/components/common/header/NavBar.module.scss';
import { useRouter } from 'next/router';

const NavBar = (props) => {
  const router = useRouter();
  const path = router?.asPath;

  return (
    <div className={styles.container}>
      <div className={styles.navigator}>
        <Link href="/postgame">
          <h2 className={path.includes('/postgame') ? styles.active : ''}>Summary</h2>
        </Link>
        <Link href="/mindful">
          <h2 className={path.includes('/mindful') ? styles.active : ''}>Mindfulness</h2>
        </Link>
        <Link href="/ingame">
          <h2 className={path.includes('/ingame') ? styles.active : ''}>In Game</h2>
        </Link>
        <div className={styles.line}></div>
      </div>
    </div>
  );
}

export default NavBar;