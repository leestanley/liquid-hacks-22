import React from 'react';

import styles from '../../../../styles/components/postgame/analytics/HeartRate.module.scss';

const HeartRate = ({ data }) => (
  <div className={styles.container}>
    <div className={styles.header}>
      <h2>Average Heart Rate</h2>
      <p>75BPM per game</p>
    </div>
  </div>
);

export default HeartRate;