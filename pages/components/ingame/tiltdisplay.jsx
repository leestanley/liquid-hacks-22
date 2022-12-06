import React, { useEffect } from 'react';

import styles from '../../../styles/components/ingame/TiltDisplay.module.scss';
import BrainIcon from './assets/brain.svg';

let canUpdate = true;
const TiltDisplay = (props) => {
  const [newTilt, setNewTilt] = React.useState(0);

  useEffect(() => {
    if (canUpdate) {
      if (props.tilt !== 0) {
        setNewTilt(props.tilt);
        canUpdate = false
        setTimeout(() => {
          setNewTilt(0);
          canUpdate = true;
        }, 2000)
      }
    }
  }, [props.tilt]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Live Tilt Health</h2>
      </div>
      <div className={styles.status}>
          <img src={BrainIcon} />
          <div>
            {
              newTilt< 0 ?
              <h2 className={styles.poor}>Poor</h2>
              : newTilt > 0 ?
              <h2 className={styles.good}>Good</h2> :
              <h2 className={styles.average}>Average</h2>
            }
            {
              newTilt< 0 ?
              <p>Reduce your use of profanity. Whether it is said to your teammates or while you are on mute, this can decrease your level of play.</p>
              : newTilt > 0 ?
              <p>Seems like you are having fun! Keep up the good communication and spirit.</p>
              :
              <p>Normal playstyle has been identified. Keep playing the game to see potential recommendations.</p>
            }
          </div>
        </div>
    </div>
  );
}

export default TiltDisplay;