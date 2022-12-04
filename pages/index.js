import React from 'react';
import Head from 'next/head';
import UserContext from './contexts/UserContext';

import styles from '../styles/Home.module.scss';

export default function Home() {
  //const context = React.useContext(UserContext);

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
      console.log("PLease wait before sending out more requests");
      return;
    }

    const usernameArray = values.username.split('#');
    if (usernameArray.length !== 2) {
      console.log("Please include your Riot tag. Note that tiltproof currently only supports Valorant. If you're a judge looking to test the app, feel free to use Snu#NA1.");
      return;
    }

    const name = usernameArray[0];
    const tag = usernameArray[1];

    fetch(`https://api.henrikdev.xyz/valorant/v1/account/${name}/${tag}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setValues((values) => ({
          ...values,
          formDisabled: false,
        }));
      })
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
    </div>
  )
}
