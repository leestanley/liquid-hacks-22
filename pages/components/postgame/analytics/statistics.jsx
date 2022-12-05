import React from 'react';
import HeartRate from './heartrate';
import Toxicity from './toxicity';

import styles from '../../../../styles/components/postgame/analytics/Statistics.module.scss';

const Statistics = (props) => {
return(
  <div className={styles.container}>
    <Toxicity toxicity={props.toxicData} />
    <HeartRate heartrate={props.heartRateData}/>
  </div>
)};

export default Statistics;