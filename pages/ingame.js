import React from 'react';
import styles from '../styles/InGame.module.scss';
import Camera from './components/ingame/camera.jsx';

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


  return (
    <div className={styles.container}>
      <Camera
        setData={setData}
        setEmotions={setEmotions}
      />
    </div>
  )
}
