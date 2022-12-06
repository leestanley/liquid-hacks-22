import React from 'react';
import styles from '../styles/InGame.module.scss';
import Header from './components/common/header/header.jsx';
import Camera from './components/ingame/camera.jsx';
import LiveAnalytics from './components/ingame/liveanalytics.jsx';
import Detections from './components/ingame/detections.jsx';

export default function InGame() {
  const [emotions, setEmotions] = React.useState({
    angry: 0,
    neutral: 0,
    happy: 0,
    surprised: 0,
    sad: 0,
    fearful: 0,
    disgusted: 0
  });
  const [data, setData] = React.useState([]);
  const [hasFace, setHasFace] = React.useState(false);
  const [tilt, setTilt] = React.useState(0);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.mainContainer}>
        <Camera
          setData={setData}
          setHasFace={setHasFace}
          setEmotions={setEmotions}
          setTilt={setTilt}
        />
        <LiveAnalytics data={data} tilt={tilt}/>
      </div>
      <Detections dahasFace={hasFace} />
    </div>
  )
}
