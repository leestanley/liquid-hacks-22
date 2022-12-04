import * as THREE from 'three';
import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import MoodIcon from './assets/mood_icon.svg';

import styles from '../../../../styles/components/postgame/analytics/MoodMap.module.scss';

const MoodMap = (props) => (
  <div className={styles.container}>
    <div className={styles.header}>
      <img src={MoodIcon} alt="Mood Icon" />
      <h2>Mood Analytics</h2>
      <p>Based off camera and voice based analysis</p>
    </div>
    <div className={styles.timeLine}>
      <div className={styles.line}></div>
      <div className={styles.lineMarkers}>
        <h2>{props.startDate}</h2>
        <p>Games over time</p>
        <h2>{props.endDate}</h2>
      </div>
    </div>
  </div>
);

export default MoodMap;