import styles from "./Match.module.scss";
import Image from 'next/image'

// import Breeze from 

const Matches = (props) => {
  return (
    <div className={styles.container}>
      <div>
        <h2>Split</h2>
        <h3>Sova</h3>
      </div>
      <button className={styles.comp}>COMPETITIVE</button>
      <div>
        <h2>.68</h2>
        <h3>KD</h3>
      </div>
      <div className={styles.divider} />

      <div>
        <h2>23%</h2>
        <h3>Emotional Variance</h3>
      </div>
      <div>
        <h2>120bpm</h2>
        <h3>Heart Rate</h3>
      </div>
      <div>
        <h2>.4</h2>
        <h3>Toxicity Score</h3>
      </div>
      <div className={styles.divider} />
      <div>
        <h2 className={styles.untilt}>-20%</h2>
        <h3 className={styles.bold}>Tilt Score</h3>
      </div>
    </div>
  );
};

export default Matches;
