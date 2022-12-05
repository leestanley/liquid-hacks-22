import React from 'react';
import VoiceIcon from './assets/voice.svg';
import CameraIcon from './assets/camera.svg';
import BrainIcon from './assets/brain.svg';

import styles from '../../../styles/components/ingame/Detections.module.scss';

const Detections = (props) => {
  const [voiceConnected, setVoiceConnected] = React.useState(false);
  const [videoConnected, setVideoConnected] = React.useState(false);

  function success(stream) {
    setVoiceConnected(true);
  }
 
 function fail(error) { 
    setVoiceConnected(false);
 }

 function successVideo(stream) {
  setVideoConnected(true);
}

function failVideo(error) { 
  setVideoConnected(false);
}

 React.useEffect(() => {
  window.navigator.getUserMedia({ audio: true }, success, fail);
  window.navigator.getUserMedia({ video: true }, successVideo, failVideo);
 }, []);

  return (
    <div className={styles.container}>
      <div className={styles.detection}>
        <img src={VoiceIcon} />
        <div className={styles.description}>
          <h2>Voice</h2>
          {voiceConnected ? <p>Successfully Connected</p> : <p className={styles.failure}>Not Connected</p>}
        </div>
      </div>
      <div className={styles.detection}>
        <img src={CameraIcon} />
        <div className={styles.description}>
          <h2>Camera</h2>
          {videoConnected ? <p>Successfully Connected</p> : <p className={styles.failure}>Not Connected</p>}
        </div>
      </div>
      <div className={styles.detection}>
        <img src={BrainIcon} />
        <div className={styles.description}>
          <h2>AI</h2>
          {props.hasFace ? <p>Face Detected</p> : <p className={styles.failure}>Not Detected</p>}
        </div>
      </div>
    </div>
  );
}

export default Detections;