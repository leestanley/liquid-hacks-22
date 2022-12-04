import React from 'react';
import ToxicIcon from './assets/toxic_icon.svg';

import styles from '../../../../styles/components/postgame/analytics/Toxicity.module.scss';

const Toxicity = ({ data }) => (
  <div className={styles.container}>
    <div className={styles.header}>
      <img src={ToxicIcon} alt="Toxic Icon" />
      <h2>Toxicity Score</h2>
      <p>Based off voice recordings</p>
    </div>
  </div>
);

export default Toxicity;