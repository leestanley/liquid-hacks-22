import React from 'react';

import styles from '../../../../styles/components/postgame/history/History.module.scss';
import Matches from '../matches'

const History = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <Matches />
      </div>
    </div>
  );
}

export default History;