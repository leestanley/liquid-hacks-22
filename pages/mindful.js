import React from 'react';
import styles from '../styles/Mindful.module.scss';
import Header from './components/common/header/header.jsx';
import Bubbles from './components/mindful/bubbles.jsx';
import BeginIcon from './components/mindful/assets/begin.svg';
import LeaveIcon from './components/mindful/assets/leave.svg';

export default function Mindful() {
  const [description, setDescription] = React.useState('People say that they are "bad" at meditating, but that stems from a fundamental lack of understanding of meditation. When you sit down to meditate, there is something you can do, and something that can happen. People confuse the act of meditating with the outcome of achieving a no-mind state.');
  const [meditating, setMeditating] = React.useState(false);
  const [decreasing, setDecreasing] = React.useState(false);
  const [timer, setTimer] = React.useState(8);


  let timerInterval;
  let interval;
  const beginMeditation = () => {
    if (interval) {
      clearInterval(interval)
    }
    setDescription('Focus on the circles breathing in and out');
    setMeditating(true);
    setTimer(8);
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      setTimer(time => time - 1);
    }, 1000);
    interval = setInterval(() => {
      clearInterval(timerInterval);
      setTimer(8);
      timerInterval = setInterval(() => {
        setTimer(time => time - 1);
      }, 1000)
      console.log(decreasing);
      setDecreasing(prevState => !prevState);
    }, 8000);
  }

  const endMeditation = () => {
    setDescription('People say that they are "bad" at meditating, but that stems from a fundamental lack of understanding of meditation. When you sit down to meditate, there is something you can do, and something that can happen. People confuse the act of meditating with the outcome of achieving a no-mind state.');
    setMeditating(false);
    if (interval) {
      clearInterval(interval)
    }
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    setTimer(8);
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.description}>
        <div>
        <h1>{ !meditating ? "Let's begin our exercise" : "Breathe and relax"}</h1>
        <p>{description}</p>
        </div>
        { !meditating ? <input type="image" src={BeginIcon} className={styles.beginIcon} onClick={beginMeditation}/> : <input type="image" src={LeaveIcon} className={styles.beginIcon} onClick={endMeditation}/>}
      </div>
      {meditating ?
      <div className={styles.breatheState}>
        <h2>{ !decreasing ? "Breathe In" : "Breathe out"}</h2>
        <p>{timer} seconds left</p>
      </div>
      : null}
      <Bubbles decreasing={decreasing} meditating={meditating}/>
    </div>
  )
}
