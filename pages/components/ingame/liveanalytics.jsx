import React from 'react';
import HeartDisplay from './heartdisplay.jsx';
import SpeechDisplay from './speechdisplay.jsx';
import TiltDisplay from './tiltdisplay.jsx';

import styles from '../../../styles/components/ingame/LiveAnalytics.module.scss';

const LiveAnalytics = (props) => {

  return (
    <div className={styles.container}>
      <TiltDisplay />
      <SpeechDisplay />
      <HeartDisplay />
    </div>
  );
}

export default LiveAnalytics;