import React from "react";

import styles from "../../../../styles/components/postgame/history/History.module.scss";
import Matches from "../matches";

const History = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
<<<<<<< HEAD
        <Matches
          map="Split"
          agent="Sova"
          agentimage="https://media.valorant-api.com/agents/320b2a48-4d9b-a075-30f1-1f93a9b638fa/displayicon.png "
          kdstat={0.59}
          moodstat={25}
          bpmstat={54}
          toxicscore={0}
          tiltscore={23}
          winloss={true}
          date={"Dec 3 9:21PM"}
        />
        <Matches
          map="Split"
          agent="Sova"
          agentimage="https://media.valorant-api.com/agents/320b2a48-4d9b-a075-30f1-1f93a9b638fa/displayicon.png "
          kdstat={0.59}
          moodstat={25}
          bpmstat={54}
          toxicscore={0}
          tiltscore={23}
          winloss={false}
        />
                <Matches
          map="Split"
          agent="Sova"
          agentimage="https://media.valorant-api.com/agents/320b2a48-4d9b-a075-30f1-1f93a9b638fa/displayicon.png "
          kdstat={0.59}
          moodstat={25}
          bpmstat={54}
          toxicscore={0}
          tiltscore={23}
          winloss={true}
        />
        <Matches
          map="Split"
          agent="Sova"
          agentimage="https://media.valorant-api.com/agents/320b2a48-4d9b-a075-30f1-1f93a9b638fa/displayicon.png "
          kdstat={0.59}
          moodstat={25}
          bpmstat={54}
          toxicscore={0}
          tiltscore={23}
          winloss={false}
        />
                <Matches
          map="Split"
          agent="Sova"
          agentimage="https://media.valorant-api.com/agents/320b2a48-4d9b-a075-30f1-1f93a9b638fa/displayicon.png "
          kdstat={0.59}
          moodstat={25}
          bpmstat={54}
          toxicscore={0}
          tiltscore={23}
          winloss={true}
        />
        <Matches
          map="Split"
          agent="Sova"
          agentimage="https://media.valorant-api.com/agents/320b2a48-4d9b-a075-30f1-1f93a9b638fa/displayicon.png "
          kdstat={0.59}
          moodstat={25}
          bpmstat={54}
          toxicscore={0}
          tiltscore={23}
          winloss={false}
        />
=======
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
>>>>>>> 4fbdcc9cd9695cd451be7f6631bbc11171e0c65e
      </div>
    </div>
  );
};

export default History;
