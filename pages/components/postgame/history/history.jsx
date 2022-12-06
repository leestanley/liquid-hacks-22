import React from "react";

import styles from "../../../../styles/components/postgame/history/History.module.scss";
import Matches from "../matches";

const History = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        {props.matches.map(match => 
          <Matches
            map={match.map}
            mode={match.mode}
            agent={match.agent}
            agentimage={match.agentCard}
            kdstat={match.kd}
            moodstat={match.variance}
            bpmstat={match.bpm}
            toxicscore={match.toxicity}
            tiltscore={match.score}
            winloss={match.win}
          />
        )}
      </div>
    </div>
  );
};

export default History;
