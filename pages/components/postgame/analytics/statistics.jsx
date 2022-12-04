import React from 'react';
import HeartRate from './heartrate';
import Toxicity from './toxicity';

import styles from '../../../../styles/components/postgame/analytics/Statistics.module.scss';

const Statistics = ({ data }) => (
  <div className={styles.container}>
    <Toxicity />
    <HeartRate />
  </div>
);

export default Statistics;