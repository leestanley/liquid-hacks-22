import React from 'react';
import Moodmap from './moodmap';
import Statistics from './statistics';

import styles from '../../../../styles/components/postgame/analytics/Analytics.module.scss';

// Sample data is in the form of an array of tuples
// Each tuple contains the following values
// [mood, weight, location between start / end]
const sampleData = [
  ['angry', 0.1, 0.1, Math.random() * 100],
  ['neutral', 0.2, 0.2, Math.random() * 100],
  ['angry', 0.4, 0.3, 0],
  ['neutral', 0.6, 0.4, Math.random() * 100],
  ['happy', 0.7, 0.5, Math.random() * 100],
  ['surprised', 0.5, 0.6, Math.random() * 100],
  ['fearful', 0.5, 0.7, Math.random() * 100],
  ['sad', 0.5, 0.8, 0],
  ['disgusted', 0.6, 1, Math.random() * 100],
]

const Analytics = (props) => {
  const [toxicData, setToxicData] = React.useState([])
  const [heartRateData, setHeartRateData] = React.useState([])
  const [sphereData, setSphereData] = React.useState([])

  React.useEffect(() => {
    const newToxicData = [];
    const newHeartRateData =[];
    const newSphereData = []
    props.matches.forEach((match, i) => {
      Object.entries(match.emotions).forEach(entry => {

        const [emotion, weight] = entry;
        newSphereData.push([emotion, weight, (i / (props.matches.length - 1))])
      });
      newToxicData.push(match.toxicity);
      newHeartRateData.push(match.bpm)
    })
    setSphereData(newSphereData);
    setToxicData(newToxicData);
    setHeartRateData(newHeartRateData);
  }, [props.matches])

  return (
    <div className={styles.container}>
      <Moodmap
        startDate={props.startDate}
        endDate={[props.endDate]}
        sphereData={sphereData}
      />
      <Statistics heartRateData={heartRateData} toxicData={toxicData}/>
    </div>
  );
}

export default Analytics;