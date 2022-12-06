import React from "react";
import ToxicIcon from "./assets/toxic_icon.svg";
import { Chart } from "react-charts";

import styles from "../../../../styles/components/postgame/analytics/Toxicity.module.scss";

const Toxicity = (props) => {
  const data = React.useMemo(() => {
    const newData = [];
    if (props.toxicity) {
      props.toxicity.forEach((value, index) => {
        newData.push([index, parseInt(value * 10)]);
      });
    }

    return [
      {
        label: "Series 1",
        data: newData,
      },
    ];
  }, [props.toxicity]);

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
        <img src={ToxicIcon} alt="Toxic Icon" />
        <h2>Toxicity Score</h2>
        <p>Based off voice recordings</p>
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
        <p>0</p>
        <p>1</p>
      </div>
      <p className={styles.xlabel}>Games over time</p>
    </div>
  );
};

export default Toxicity;
