import React, { useEffect } from 'react';
import styles from '../styles/InGame.module.scss';
import Header from './components/common/header/header.jsx';
import Camera from './components/ingame/camera.jsx';
import LiveAnalytics from './components/ingame/liveanalytics.jsx';
import Detections from './components/ingame/detections.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../contexts/UserContext';
import {db} from '../utils/firebase.js';
import { doc, getDocs, query, collection, where, addDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

let startTime = 0;
export default function InGame() {
  const user = React.useContext(UserContext);

  const [emotions, setEmotions] = React.useState({
    angry: 0,
    neutral: 0,
    happy: 0,
    surprised: 0,
    sad: 0,
    fearful: 0,
    disgusted: 0
  });
  const [data, setData] = React.useState([]);
  const [hasFace, setHasFace] = React.useState(false);
  const [tilt, setTilt] = React.useState(0);
  useEffect(() => {
    startTime = Date.now();
    console.log(startTime);
  }, []);

  const clickEnd = () => {
    const name = user.user.name.split("#")[0];
    const tag = user.user.name.split("#")[1]
    fetch(`https://api.henrikdev.xyz/valorant/v3/matches/na/${name}/${tag}`).then((res) => res.json())
    .then(async (jsonData) => {
      console.log(jsonData);
      if (jsonData.data && jsonData.data.length > 0) {
        const endTime = Date.now();
        const match = jsonData.data[0];

        if (parseInt(String(match.metadata.game_start) + "000") < startTime) {
          toast.error("You need to play and end a Valorant game on this account while recording!", {
            position: "top-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          return;
        }
        const player = match.players.all_players.find(element => element.name === name && element.tag === tag);
        console.log(player);

        const agent = player.character;
        const agentCard = player.assets.agent.small
        const bpm = Math.floor(data.reduce((partialSum, a) => partialSum + a, 0) / data.length) ?? 70;
        const duration = match.metadata.game_length;
        let sortedEmotions = [];
        for (const emotion in emotions) {
            if (emotion === 'neutral') {
              sortedEmotions.push([emotion, emotions[emotion]/10]);
            } else { 
              sortedEmotions.push([emotion, emotions[emotion]]);
            }
        }
        
        sortedEmotions.sort(function(a, b) {
            return a[1] - b[1];
        });
        const newEmotions = {};
        for (const index in sortedEmotions) {
          newEmotions[sortedEmotions[index][0]] =(index/6);
        }

        const kd = (player.stats.kills / player.stats.deaths).toFixed(2);
        console.log(kd);
        const map = match.metadata.map;
        const matchId = match.metadata.matchid;
        const matchTime = match.metadata.game_start_patched;
        let mode = 'UNRATED';
        if (match.metadata.mode === "Competitive") {
          mode = 'COMP';
        } else if (match.metadata.mode === 'Unrated') {
          mode = 'UNRATED';
        } else if (match.metadata.mode === 'Deathmatch') {
          mode = 'DM';
        } else if (match.metadata.mode === 'Spike Rush') {
          mode = 'RUSH';
        } else if (match.metadata.mode === 'Escalation') {
          mode = 'ESCL';
        } else {
          mode = 'REPL';
        }

        const usersRef = doc(db, "users", "DC");

        // Removed toxicity sentiment analysis from Google Cloud API because we ran out of Google Cloud credit.
          // Instantiates a client
        /*
        const client = new language.LanguageServiceClient();


        const document = {
          content: transcript,
          type: 'PLAIN_TEXT',
        };

        // Detects the sentiment of the text
        const [result] = await client.analyzeSentiment({document: document});
        const toxicity = result.documentSentiment;*/

        const toxicity = Math.random().toFixed(1);
        const variance = (sortedEmotions[6][1] - sortedEmotions[0][1]) / 2;
        const win = (match.teams.blue.has_won || match.teams.red.has_won) ? ((match.teams.blue.has_won && player.team === 'BLUE') || (match.teams.red.has_won && player.team === 'RED')) :false;
        let score = 0;
        if (toxicity > 0.5) {
          score -= 10;
        } else {
          score += 5
        }

        if (win) {
          score += 10
        } else {
          score -= 20;
        }

        if (variance > 30) {
          score += 10;
        }

        if (sortedEmotions[6][0] === 'neutral') {

        } else if (sortedEmotions[6][0] === 'happy') {
          score += 10;
        } else if (sortedEmotions[6][0] === 'surprised') {
          score += 5;
        } else {
          score -= 10;
        }

        if (score >= 0) {
          score = "+" + String(score);
        } else {
          score = String(score);
        }

        const submitData = {
          agent,
          agentCard,
          bpm: bpm ? bpm : 70,
          duration,
          emotions: newEmotions,
          kd,
          map,
          matchId,
          matchTime,
          mode,
          score,
          toxicity,
          variance,
          win,
        }
        
        await getDocs(query(collection(db, 'users'), where("username", "==", user.user.name)))
        .then(async (querySnapshot)=>{      
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
            console.log(newData);
            if (newData.length < 1) {
              await addDoc(collection(db, 'users'), {
                username: user.user.name,
                matches: [submitData],
              })
            } else {
              await updateDoc(doc(db, "users", newData[0].id), {
                matches: arrayUnion(submitData),
              });
            }
        }).catch((error) => {
          console.log(error);
          toast.error('Something bad happened!', {
            position: "top-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          })});

        /*
        await setDoc(doc(db, "users", "LA"), submitData

        )*/
      }

      //
      //Router.push("/postgame");
    }).catch((error) => {
      console.log(error);
      toast.error('Something bad happened!', {
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })});
    console.log(emotions);
  }

  return (
    <div className={styles.container}>
      <Header clickEnd={clickEnd}/>
      <div className={styles.mainContainer}>
        <Camera
          setData={setData}
          setHasFace={setHasFace}
          setEmotions={setEmotions}
          setTilt={setTilt}
        />
        <LiveAnalytics data={data} tilt={tilt}/>
      </div>
      <ToastContainer />
      <Detections dahasFace={hasFace} />
    </div>
  )
}
