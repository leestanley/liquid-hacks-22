import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import mindButton from './assets/mindButton.svg';
import Router from "next/router";
import {UserContext} from '../../../../contexts/UserContext.js';

import styles from "../../../../styles/components/common/header/NavBar.module.scss";
import { useRouter } from "next/router";

const NavBar = (props) => {
  const router = useRouter();
  const path = router?.asPath;
  const user = React.useContext(UserContext);

  React.useEffect(() => {
    if (!user.user.name) {
      Router.push('/');
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.name}>
        <img
          src={
            user.user.image
          }
          width={125}
          height={125}
          alt="Icon"
          className={styles.icon}
        />
        <div className={styles.col}>
          <h1>{user.user.name}</h1>
          <span>Level {user.user.level} | {user.user.rank ? user.user.rank : 'Unranked'} | {user.user.region} </span>
        </div>
      </div>
      <div className={styles.tiltMeter}>
        <div className={styles.tiltText}>
          <div>
        <h2>Very Tilted</h2>
        <p>We recommend you take a break or perform some breathing exercises to cool off.</p>
        <Link href="/mindful">
          <img className={styles.mindButton} src={mindButton} alt="Mindfulness button"/>
        </Link>
        </div>
        </div>
      </div>
      <div className={styles.navigator}>
        <Link href="/postgame">
          <h2 className={path.includes("/postgame") ? styles.active : ""}>
            Summary
          </h2>
        </Link>
        <Link href="/mindful">
          <h2 className={path.includes("/mindful") ? styles.active : ""}>
            Mindfulness
          </h2>
        </Link>
        <Link href="/ingame">
          <h2 className={path.includes("/ingame") ? styles.active : ""}>
            In Game
          </h2>
        </Link>
        <div className={styles.line}></div>
      </div>
    </div>
  );
};

export default NavBar;
