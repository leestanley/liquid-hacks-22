import React from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "../../../../styles/components/common/header/NavBar.module.scss";
import { useRouter } from "next/router";

const NavBar = (props) => {
  const router = useRouter();
  const path = router?.asPath;

  return (
    <div className={styles.container}>
      <div className={styles.name}>
        <img
          src={
            "https://media.valorant-api.com/playercards/8edf22c5-4489-ab41-769a-07adb4c454d6/smallart.png"
          }
          width={125}
          height={125}
          alt="Icon"
          className={styles.icon}
        />
        <div className={styles.col}>
          <h1>Snu#001</h1>
          <span>Level 230 | Gold 1 | NA </span>
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
