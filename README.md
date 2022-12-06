![Logo](https://i.imgur.com/whhEMtS.png)
<p align="center"><i>Built for Liquid Hacks 3.0</i></p>

### Running Our Application

First, run the development server in your terminal:

```bash
npm run dev
# or
yarn dev
```

Then, open [**http://localhost:3000**](http://localhost:3000) with your browser to see the result.

You can view the feature in production at **https://tiltproof.vercel.app/**.

## Background

Gaming culture has exploded into the mainstream over the past decade, thanks to the growth in competitive video games, esports, and streamers. However, with this rise in online gaming, the community has also become increasingly toxic. [**7 out of 10 players**](https://www.protocol.com/unity-online-gaming-toxicity-study) have reported that they have experienced **"sexual harassment, hate speech, threats of violence, doxing"** or some form of abuse while gaming.

As two Platinum ELO players in League of Legends, we have first hand experience with this abuse and mental frustration. We also have experience with games that rely on voice communications like CS:GO and Valorant, where we've been subject to racism, homophobia, and misogyny leading us to adopt coping mechanisms such as disabling communications and uninstalling. While gamers like to joke about these experiences and make fun of "mental booming", the reality is that what happens in these games do not stay in these games. Experiencing toxicity can, have long term and dangerous consequences on your psychological well being with studies showing that [**"over a tenth [of participants said] it resulted in depressive or suicidal thoughts and over 20% said it caused them to quit playing."**](https://msutoday.msu.edu/news/2021/faculty-voice-gaming-and-toxicity) It should also be noted that these effects primarily affect women and minorities, due to them taking the brunt of the toxicity.

In the world of **esports**, a player's mental health is not just the difference between a win and a loss. **It can be the difference between their decision to carry on playing.** We saw this when Danny stepped down from Evil Geniuses, Uzi left RNG, and PawN retired from DRX. Teams like Version1 and TSM have turned to coaches who put more emphasis on mental wellbeing like [**Adamas Esports**](https://www.adamasesports.gg/) and [**Mind Games Weldon**](https://twitter.com/mindgamesweldon) . Nonprofit organizations like [**Take This**](https://www.takethis.org/) have also been formed to conduct more research. The growth in people dedicated to tackling this issue is amazing, but it's also crucial that we provide them, and gamers themselves, with the proper tools to measure, track, and improve their mental health when playing competitive video games. That's why we built **tiltproof**.

*****

# What is Tiltproof?
**Tiltproof** is a web application that uses machine learning to allow **casual gamers, professional athletes, and esport coaches**  to measure, track, and act on players' decline in mental health and increase in toxic behavior when playing competitive video games.

It calculates and provides players with a _"tilt score"_, a commonly used term referring to an [**"emotional reaction to in-game events that cause a deterioration in gameplay. Tilt in esports is primarily associated with frustration and rage while playing and comes up alongside investigations of toxic or deviant behavior."**](https://dl.acm.org/doi/fullHtml/10.1145/3411764.3445143)

**1 | Connect your gaming accounts.**

![Home Page](https://s4.gifyu.com/images/startscreen.gif)

_Tiltproof uses APIs from the world's most popular games to get direct access to players' profile information and match history._

**2 | Measure your emotions, heartrate, and the sentiment / toxicity of your voice communications.**

![In Game Page](https://s4.gifyu.com/images/ingame.gif)

_Tiltproof uses machine learning and Mayer Wave analysis in order to calculate and record health data with just the webcam and microphone available on your average gaming PC._

**3 |Track and visualize your own mental health and toxicity to others, with your video game match history.**

![Post Game Screen](https://s4.gifyu.com/images/newpostgame.gif)

_Tiltproof combines data visualization tools and a scoring algorithm to generate a dashboard allowing gamers and their coaches to track their mental wellbeing._

**4 | Practice meditation and mindfulness to better yourself.**

![Mindful Screen](https://s4.gifyu.com/images/lowerresmindful.gif)

_Tiltproof provides beautiful and interactive mindfulness tools, powered by WebGL, to help players untilt themselves._
****

## Design Process
We utilized the **Double Diamond Process**; this design method not only includes visual design, but a full-fledged research cycle in which you must discover and define your problem before tackling your solution

>    **Put people first.**  Start with an understanding of the people using a service, their needs, strengths and aspirations.
>    
>    **Communicate visually and inclusively.**  Help people gain a shared understanding of the problem and ideas.
>    
>    **Collaborate and co-create**. Work together and get inspired by what others are doing.
>    
>    **Iterate, iterate, iterate.** Do this to spot errors early, avoid risk and build confidence in your ideas.

![Double Diamond Design](https://i.imgur.com/ktcKuyu.png)

### User Personas

We start off the process by creating user personas as a method of secondary research. By creating both primary and secondary user personas, we are able to more deeply relate to different perspectives and understand goals and wants.

![User Personas](https://i.imgur.com/a1jtHZO.png)

### Design Language

We created mood boards, color scenes, and font choices to help us prototype. This occurred in between generating Low Fidelity and High Fidelity prototypes. This allowed us to establish a visual brand and identity so that our application would remain consistent across multiple pages.

![Tiltproof Branding Guide](https://i.imgur.com/oWQw18K.png)

### Prototyping
After creating user personas, we began prototyping. We utilized the design tools [**Figma**](https://www.figma.com) and [**Spline**](https://spline.design/) to protoype our designs before doing any coding. Through this, we were able to get iterative feedback so that we spend less time re-writing code. We created Low Fidelity Prototypes first and slowly worked ourselves up to High Fidelity prototypes which incorporate deeper visuals and interactions.

![Prototyping](https://i.imgur.com/LS6ENjt.jpg)

## Engineering Process

### System Architecture

![System Architecture Diagram](https://i.imgur.com/kwlowr8.png)

_Our system is designed for both speed and scalability._

### Frontend

Our frontend is a web application built primarily on a stack of **React, Next.js, JavaScript, SASS, and Yarn deployed on Vercel**. As seen in the architecture diagram, our frontend communicates with our backend using REST API calls in order to store user information. Facial recognition and emotion detection are also done entirely in the frontend through a combination of React Webcam, and Face API. Voice recognition is done using the browsers' built in Web Speech API, coupled with Google Cloud Machine Learning APIs for sentiment analysis. Users' emotional data is displayed using a 3D display created with WebGL using the Three.js library and all other data is displayed using various data visualization libraries.

Facial recognition is also used in order to provide data for calculating the user's heart rate. We rewrote and repaired a broken open-source library that we ourselves developed from the ground up two years ago in order to collect the user's heart rate. It works by taking advantage of **Mayer waves - oscillations of arterial pressure that occurs in conscious subjects**. Using these, we determine your heart rate by monitoring the tiny fluctuations in the color of the forehead. This is done by taking the average pixel values of the forehead region and performing a Fourier Transform to convert this signal to a sum of frequencies, the most prominent of which will correspond to the user's heart rate.

![](https://res.cloudinary.com/devpost/image/fetch/s--gKZH76Eb--/c_limit,f_auto,fl_lossy,q_auto:eco,w_900/https://i.imgur.com/UH0vBwQ.png)

_The Fourier Transform used to find a user's heart rate from Mayer wave data._

### Backend
Our backend is run completely on Firebase Firestore Database used to store player profiles. Our data structure contains player profile information, as well as an array of objects representing player matches, containing their match metadata coupled with health data. The frontend communicates directly with our backend using REST API calls.

While not our backend, the frontend also communicates directly with Google Cloud's Machine Learning APIs as well as Riot Games's Valorant Ingame API using the [**unofficial open source APi developed by Henrik-3**](https://github.com/Henrik-3/unofficial-valorant-api). In the future, we would like to add additional support for other game APIs such as League of Legends, Counter-Strike: Global Offensive, Apex Legends, and more.

![technologies](https://i.imgur.com/OcD1oxF.png)

_All of the technologies that went into Tiltproof._

****
## Research

We are not mental health experts, and unfortunately we do not have any mental health experts on our team. We're just gamers but we wanted to build this project because we have first hand experience with the stress and anxiety that games of League of Legends and Valorant can cause. However, because we are not medical experts, we knew that we had to do a ton of research before attempting to build this application.

### Citations

Claude Julien, The enigma of Mayer waves: Facts and models, Cardiovascular Research, Volume 70, Issue 1, April 2006, Pages 12–21, https://doi.org/10.1016/j.cardiores.2005.11.008

Daniel Johnson, Lennart E. Nacke, and Peta Wyeth. 2015. All about that base: differing player experiences in video game genres and the unique case of moba games. In Proceedings of the 33rd Annual ACM Conference on Human Factors in Computing Systems, 2265-2274.

Free to play? hate, harassment and positive social experience in online games 2020. ADL. (n.d.). Retrieved December 4, 2022, from https://www.adl.org/free-to-play-2020 

Guo Freeman and Donghee Yvette Wohn. 2017. Social support in eSports: building emotional and esteem support from instrumental support interactions in a highly competitive environment. In Proceedings of the Annual Symposium on Computer-Human Interaction in Play. 435-447. 

Wu, Minerva & Lee, Je Seok & Steinkuehler, Constance. (2021). Understanding Tilt in Esports: A Study on Young League of Legends Players. 1-9. 10.1145/3411764.3445143. 

Yubo Kou and Xinning Gui. 2020. Emotion Regulation in eSports Gaming: A Qualitative Study of League of Legends. In Proceedings of the ACM on Human-Computer Interaction, Vol 4, No. CSCW2, Article 158 (October 2020). 26 pages. https://doi.org/10.1145/3415229 

****
## Reflections

### What We Learned
We both used to be prominent hackers as college students but this is our first ever industry wide hackathon! We actually came out of retirement for this event. Still, we had a lot to learn!

On the design side, this was our most ambitious project yet. Our projects are typically built in a light mode theme, but we knew we had to design in dark mode for the first time because it appeals more to gamers. Additionally, we knew from the very beginning that we wanted to incorporate 3D models and so we had to learn how to model figures with Spline.

![Spline](https://i.imgur.com/ryK0dcX.png)
_We learned Spline to create 3D models for our application's design._

On the engineering side, there were so many technologies that we used, that we had to learn or refamiliarize ourselves with. We decided to use Next.js for the first time and we encountered a ton of issues due to our experience. We even struggled with what are usually trivial tasks such as displaying images and generating routes. We also tried our hand at Three.js animation. In the past, we did rudimentary animation with the help of the GSAP library, but this time we decided to animate our Three.js models frame by frame using math!

### What's Next
Tiltproof has endless features that could be added and expanded. First off, we would like to incorporate more games. Because this was built in just a few days, tiltproof currently only supports Valorant. In the near future, we want to expand it to also support League of Legends, CS:GO, Overwatch, and many more competitive esport games.

Additionally, we would like to incorporate a per match view. We actually managed to design such a view, but ran out of time to code it up. You can see it below!

![Uncompleted view](https://i.imgur.com/4kQg3f7.png)
_Our uncoded, but fully designed single match screen._

Finally, we want to work on scaling up our backend. Because the project was built in the course of just one weekend, the backend was built solely on Firebase. In an ideal world, we would have created a more secure, powerful, and scalable backend in order to handle extreme amounts of player load.

### Acknowledgements
Thank you Team Liquid for hosting this hackathon! We're big fans of your team (Although, we're kinda mad you chose to have a mostly imports roster for your NA League Team!). We can't wait for the 2023 League of Legends season regardless, and to see the nAts's sneaky Cypher setups in VCT EMEA. Good luck to your teams next year! We're sure your League roster will be able to get into [Worlds](https://www.youtube.com/watch?v=LB-4MTFszG0) this time around, especially with the Pyosik pickup!
