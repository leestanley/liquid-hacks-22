import React from 'react';
import Moodmap from './moodmap';
import Statistics from './statistics';

import styles from '../../../../styles/components/postgame/analytics/Analytics.module.scss';

const Analytics = (props) => {
  return (
    <div className={styles.container}>
      <Moodmap />
      <Statistics />
    </div>
  );
}

export default Analytics;