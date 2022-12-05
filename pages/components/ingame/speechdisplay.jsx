import React from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import styles from '../../../styles/components/ingame/SpeechDisplay.module.scss';

const SpeechDisplay = (props) => {

  const { transcript, resetTranscript } = useSpeechRecognition();

  React.useEffect(() => {
    if (transcript.length > 300) {
      resetTranscript();
    }
  }, [transcript])

  React.useEffect(() => {
    SpeechRecognition.startListening({
      continuous: true,
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Speech to text</h2>
      </div>
      <div className={styles.transcripts}>
        {transcript}
      </div>
    </div>
  );
}

export default SpeechDisplay;