import React from 'react';
import styles from '../styles/Mindful.module.scss';
import Header from './components/common/header/header.jsx';
import Bubbles from './components/mindful/bubbles.jsx';

export default function Mindful() {
  return (
    <div className={styles.container}>
      <Header />
      <Bubbles />
    </div>
  )
}
