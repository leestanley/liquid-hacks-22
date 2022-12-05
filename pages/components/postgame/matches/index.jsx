import styles from "./Match.module.scss";
import Image from "next/image";

const Matches = (props) => {
  return (
    <div className={styles.match}>
      <div className={styles.doubleimage}>
        <Image
          src={"/" + props.map + ".png"}
          width={200}
          height={113}
          style={{ position: "absolute", zindex: "-100" }}
        />
        <Image
          src={
            props.agentimage
          }
          width={60}
          height={60}
          style={{ position: "absolute", zindex: "-99", bottom: "5%" }}
        />
        <div className={props.winloss ? styles.win : styles.loss } />
        <div className={styles.col}>
          <div className={styles.texts}>
            <h2>{props.map}</h2>
            <h3>{props.agent}</h3>
            <h3>{props.date}</h3>
          </div>
        </div>
      </div>

      <button className={styles.comp}>{props.mode.toUpperCase()}</button>
      <div className={styles.col}>
        <h2>{props.kdstat}</h2>
        <h3>KD</h3>
      </div>
      <div className={styles.divider} />

      <div className={styles.col}>
        <h2>{props.moodstat + "%"}</h2>
        <h3>Mood</h3>
      </div>
      <div className={styles.col}>
        <h2>{props.bpmstat + "bpm"}</h2>
        <h3>Heart Rate</h3>
      </div>
      <div className={styles.col}>
        <h2>{props.toxicscore}</h2>
        <h3>Toxicity</h3>
      </div>
      <div className={styles.divider} />
      <div className={styles.col}>
        <h2 className={styles.untilt}>{props.tiltscore}</h2>
        <h3 className={styles.bold}>Tilt</h3>
      </div>
    </div>
  );
};

export default Matches;
