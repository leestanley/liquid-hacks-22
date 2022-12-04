import React from 'react';
import HeartRateIcon from './assets/heartrate_icon.svg';

import styles from '../../../../styles/components/postgame/analytics/HeartRate.module.scss';

const HeartRate = ({ data }) => (
  <div className={styles.container}>
    <div className={styles.header}>
      <img src={HeartRateIcon} alt="HeartRate Icon" />
      <h2>Average Heart Rate</h2>
      <p>75BPM per game</p>
    </div>
  </div>
);

export default HeartRate;