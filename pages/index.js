import React, { useContext }  from 'react';
import Router from "next/router";
import Head from 'next/head';
import {UserContext} from '../contexts/UserContext';
import styles from '../styles/Home.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';

export default function Home() {
  const user = useContext(UserContext);
  const [modalIsOpen, setIsOpen] = React.useState(false);


  React.useEffect(() => {
    setIsOpen(true);
  }, []);

  function closeModal() {
    setIsOpen(false);
  }

  const [values, setValues] = React.useState({
    username: '',
    formDisabled: false,
  });

  function handleSubmit(e) {
    e.preventDefault();

    if (!values.formDisabled) {
      setValues((values) => ({
        ...values,
        formDisabled: true,
      }));
    }

    if (values.formDisabled) {
      toast.error("Please wait before sending out more requests.", {
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

    const usernameArray = values.username.split('#');
    if (usernameArray.length !== 2) {
      setValues((values) => ({
        ...values,
        formDisabled: false,
      }));
      toast.error("Please format your name in form of NAME#TAG. Note that only Valorant is currently supported.", {
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

    const name = usernameArray[0];
    const tag = usernameArray[1];

    fetch(`https://api.henrikdev.xyz/valorant/v1/account/${name}/${tag}`)
      .then((res) => res.json())
      .then((jsonData) => {
        setValues((values) => ({
          ...values,
          formDisabled: false,
        }));
        if (jsonData.data.name && jsonData.data.tag && jsonData.data.account_level && jsonData.data.card.small) {
          user.setUser(state => ({
            ...state,
            name: jsonData.data.name + '#' + jsonData.data.tag,
            level: jsonData.data.account_level,
            image: jsonData.data.card.small,
          }));
        }
        fetch(`https://api.henrikdev.xyz/valorant/v1/mmr/na/${name}/${tag}`).then((res) => res.json())
        .then((jsonData) => {
          console.log(jsonData);
          user.setUser(state => ({
            ...state,
            rank: jsonData.data?.currenttierpatched ?? '',
          }));
          Router.push("/postgame");
        }).catch((error) => {
          toast.error('Something bad happened!', {
            position: "top-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          })});;
      }).catch((error) => {
        console.log(error);
        toast.error('User could not be found. Double check your name and tag.', {
          position: "top-right",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        toast.info("Judging? Log in with Snu#001.", {
          position: "top-right",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  function handleInputChange(e) {
    setValues((values) => ({
      ...values,
      username: e.target.value,
    }));
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>tiltproof</title>
        <meta name="description" content="mental health for gamers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form
        onSubmit={handleSubmit}
      >
        <input
          placeholder="Enter your IGN"
          onChange={handleInputChange}
          value={values.username} 
        ></input>
        <button
          type="submit"
          className=""
        >
          START
        </button>
      </form>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <button onClick={closeModal}></button>
        <h2>A Note to Liquid Judges</h2>
        <p>Here's some instructions to help you out!</p>
        <ul>
          <li>This app currently only supports Valorant, the fastest growing esport, but we will be expanding it to work with all popular competitive games including League of Legends, Overwatch, and CS:GO.</li><br />
          <li>Log in with Snu#001. This is Stanley's real and personal Valorant account and he played some games recording data for you! It will let you explore the app without having to play games. </li> <br />
          <li>The In Game tab will show ML and heartrate working after you enable camera and audio. Saving your recorded data will not be possible unless a Valorant game is played by Snu#001. You can still view real data taken from Snu#001's most recent games / recordings on the Summary tab. </li> <br />
          <li>If you <b>really</b> want to save your own data onto our servers, you will need to use your own Valorant account and play your own Valorant game.</li><br />
          <li>If you run into any bugs, refresh the page and try again! Message Snu on Discord if you need more help!</li>
        </ul>
        <p>Thanks so much for visiting our application! Hope you enjoy!</p>
      </Modal>
      <ToastContainer />
    </div>
  )
}
