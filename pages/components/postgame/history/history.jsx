import React from "react";

import styles from "../../../../styles/components/postgame/history/History.module.scss";
import Matches from "../matches";

const test = () => {
  console.log('test');
}

const History = (props) => {
  const [filter, setFilter] = React.useState('ALL');

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
      <div className={styles.filter}>
        <h2 className={filter === 'ALL' ? styles.activeH2 : ''} onClick={() => {setFilter('ALL')}}>All</h2>
        <h2 className={filter === 'COMP' ? styles.activeH2 : ''} onClick={() => {setFilter('COMP')}}>Competitive</h2>
        <h2 className={filter === 'RUSH' ? styles.activeH2 : ''} onClick={() => {setFilter('RUSH')}}>Spike Rush</h2>
        <h2 className={filter === 'UNRATED' ? styles.activeH2 : ''} onClick={() => {setFilter('UNRATED')}}>Unrated</h2>
      </div>
        {props.matches ? props.matches.map(match => 
        {
          if (filter === 'ALL' || match.mode === filter) {
            return (
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
          />)
          return null;
          }
        }

        ) : null}
      </div>
    </div>
  );
};

export default History;
