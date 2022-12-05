import React from 'react';
import HeartIcon from './assets/heart.svg';
import { Chart } from 'react-charts';
React.useLayoutEffect = React.useEffect;

import styles from '../../../styles/components/ingame/HeartDisplay.module.scss';

const HeartDisplay = (props) => {

  const data = React.useMemo(() => {
      const newData = [];
      if (props.plot) {
        props.plot.slice(Math.max(props.plot.length - 10, 0)).forEach((value, index) => {
          newData.push([index, parseInt(value)])
        });
      }
      return [{
        label: 'Series 1',
        data: newData
      }]
    }, 
    [props.plot]
  );

  const series = React.useMemo(
    () => ({
			showPoints: false,
    }),
    []
  )

	const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom', show: false },
      { type: 'linear', position: 'left', show: false }
    ],
    []
  )

  const getSeriesStyle = React.useCallback((series) => {
    return {
      color: "#FFFFFF",
    };
  }, []);

  return (
    <div className={styles.container}>
      <img src={HeartIcon} />
      <div>
        <h2>Heart Rate</h2>
        <p>{props.plot[props.plot?.length - 1]} BPM</p>
      </div>
      <div className={styles.heartChart}>
        <Chart data={data} axes={axes} series={series} getSeriesStyle={getSeriesStyle} />
			</div>
    </div>
  );
}

export default HeartDisplay;