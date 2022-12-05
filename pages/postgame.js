import React from 'react';
import { db } from '../utils/firebase.js';
import { collection, where, getDocs } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Analytics from './components/postgame/analytics/analytics.jsx';
import Header from './components/common/header/header.jsx';
import History from './components/postgame/history/history.jsx';

import styles from '../styles/PostGame.module.scss';

export default function PostGame() {

  const [matches, setMatches] = React.useState([]);

  const fetchUser = async () => {  
    await getDocs(collection(db, 'users'), where("usernamel", "==", "Snu#001"))
      .then((querySnapshot)=>{              
          const newData = querySnapshot.docs
              .map((doc) => ({...doc.data(), id:doc.id }));
          if (newData.length < 1) {
            toast.error("No matches found. Please click play.", {
              position: "top-right",
              autoClose: 10000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            toast.info("If you're a judge, log in with Snu#001.", {
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
          setMatches(newData[0].matches);
      })
  }

  React.useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <Analytics
        matches={matches}
        startDate={'10.23.2022'}
        endDate={'10.24.2022'}/>
      <History matches={matches}/>
      <ToastContainer />
    </div>
  )
}
