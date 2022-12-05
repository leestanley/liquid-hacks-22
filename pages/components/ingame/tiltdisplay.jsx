import React from 'react';

import styles from '../../../styles/components/ingame/TiltDisplay.module.scss';
import BrainIcon from './assets/brain.svg';

const TiltDisplay = (props) => {

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Live Tilt Health</h2>
      </div>
      <div className={styles.status}>
          <img src={BrainIcon} />
          <div>
            <h2>Poor</h2>
            <p>Reduce your use of profanity. Whether it is said to your teammates or while you are on mute, this can decrease your level of play.</p>
          </div>
        </div>
    </div>
  );
}

export default TiltDisplay;