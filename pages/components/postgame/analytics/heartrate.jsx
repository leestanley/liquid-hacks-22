import React from "react";
import HeartRateIcon from "./assets/heartrate_icon.svg";
import { Chart } from "react-charts";

import styles from "../../../../styles/components/postgame/analytics/HeartRate.module.scss";

const HeartRate = (props) => {
  const data = React.useMemo(() => {
    const newData = [];
    if (props.heartrate) {
      props.heartrate.forEach((value, index) => {
        newData.push([index, parseInt(value)]);
      });
    }
    return [
      {
        label: "Series 1",
        data: newData,
      },
    ];
  }, [props.heartrate]);

  const series = React.useMemo(
    () => ({
      showPoints: false,
    }),
    []
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom", show: false },
      { type: "linear", position: "left", show: false },
    ],
    []
  );

  const getSeriesStyle = React.useCallback((series) => {
    return {
      color: "#FFFFFF",
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={HeartRateIcon} alt="HeartRate Icon" />
        <h2>Average Heart Rate</h2>
        <p>Resting is ~70BPM</p>
      </div>
      <div className={styles.chartContainer}>
        <div className={styles.chart}>
          <Chart
            data={data}
            axes={axes}
            series={series}
            getSeriesStyle={getSeriesStyle}
          />
        </div>
      </div>
      <div className={styles.num}>
        <p>Min</p>
        <p>Max</p>
      </div>
      <p className={styles.xlabel}>Games over time</p>
    </div>
  );
};

export default HeartRate;
