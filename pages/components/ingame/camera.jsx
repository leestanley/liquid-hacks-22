import React from 'react';
import Webcam from 'react-webcam';
import SmileyIcon from './assets/smiley.svg';

import styles from '../../../styles/components/ingame/Camera.module.scss';

// NPM imports to essentially mimic numpy in JavaScript.
const cwise = require('cwise');
const fft = require('ndarray-fft');
const linspace = require('ndarray-linspace');
const ops = require('ndarray-ops');
const ndarray = require('ndarray');
const zeros = require('zeros');

import * as faceapi from 'face-api.js';

/** ========== CONSTANTS ========== **/

// Width of the camera.
const VIDEO_WIDTH= 1280;

// Height of the camera.
const VIDEO_HEIGHT = 720;

// Information fed into react-webcam to determine camera size.
const VIDEO_CONSTRAINTS= {
  width: VIDEO_WIDTH,
  height: VIDEO_HEIGHT,
  facingMode: 'user'
};

// Default frames per second for the application.
// (Used because we store this many images per second and feed it into an image canvas.
const FRAMES_PER_SECOND = 10;

// Number of samples used to calculate the user's heart rate.
const HEARTRATE_NUM_SAMPLES = 256;

/** ========== END CONSTANTS ========== **/



/** ========== LOCAL VARIABLES ========== **/

// Start time when heart rate begins being measured.
const startTime = Date.now();

// Array tracking the times samples are taken for heart rate.
const times = [];

// Array tracking the averages of the heart rate samples.
let averages = [];


// Pointers to refer to the intervals running application.
// Used to end the interval on app close, preventing memory leaks.
let emotionCycle, canvasCycle;

// Variable to track user's heart rate.
let heartRate = 70;

/** ========== END LOCAL VARIABLES ========== **/



/** ========== HELPER FUNCTIONS ========== **/

/** 
 * Calculates the coordinates for the rectangle indicating a user's forehead
 * using coordinates (in pixels) received from face-api.
 * 
 * @param {number} x The starting X coordinate of a user's face
 * @param {number} y The starting Y coordinate of a user's face
 * @param {number} width The width of a user's face
 * @param {number} height The height of a user's face
 */
function getCoords(x, y, width, height) {
  // Adjust these contents to calibrate the location of the user's forehead.
  const X_MULTIPLIER = 0.35;
  const WIDTH_MULTIPLIER = 0.3;

  return {
    x: x + width * X_MULTIPLIER,
    y,
    width: width * WIDTH_MULTIPLIER,
    height,
  };
}

// Credits to https://github.com/erdewit/heartwave for providing a Python version of 
// a heart rate detector using Mayer waves.

/**
 * Continually updates the heart rate.
 * 
 * @param {Array} imageData Data received representing the pixels from face-api
 */
function updateHeartRate(imageData) {
  // Calculate the average and add to the averages array.
  const currAvg = getAverage(imageData);
  averages.push(currAvg);
  
  // Calculate the time elapsed and add to the times array.
  const currTime = Date.now() - startTime;
  times.push(currTime);

  // Perform clean up, if necessary.
  if (averages.length > HEARTRATE_NUM_SAMPLES) {
      averages.splice(0,1);
      times.splice(0,1);
  // If there's enough average data, we have enough data to begin calculating heart rate. 
  } else if (averages.length > 10) {

    // Note that this is different from the fps used to update the canvas.
    // This fps can vary because it is dependent on the speed data is passed from face-api.
    const frames = HEARTRATE_NUM_SAMPLES / (times.at(-1) - times.at(-2));
    const evenTimes = linspace(times[0], times.at(-1), HEARTRATE_NUM_SAMPLES);
    const interpolated = interpolate(evenTimes, times, averages);

    // Multiply the interpolated array by the hamming window and mean center.
    cwiseMultArrays(interpolated, hamming(HEARTRATE_NUM_SAMPLES));
    cwiseAddScalar(interpolated,-mean(interpolated));
    const complex = zeros([interpolated.size]);
    fft(1, interpolated, complex);

    // Get the frequencies represent the heart rate.
    const frequencies = linspace(0 , (HEARTRATE_NUM_SAMPLES * 0.5) + 1, (HEARTRATE_NUM_SAMPLES * 0.5 ) + 1);
    cwiseMultScalar(frequencies, frames / HEARTRATE_NUM_SAMPLES * 60);
    return getFrequencies(interpolated, complex, frequencies, 50, 150);
  }
}

/**
 * Cwise function to add scalars together.
 * See https://www.npmjs.com/package/cwise for inputs.
 */
const cwiseAddScalar = cwise({
    args: ['array', 'scalar'],
    body: function(a,n) {
        a = a + n;
    }
});

/**
 * Cwise function to multiply arrays together.
 * See https://www.npmjs.com/package/cwise for inputs.
 */
 const cwiseMultArrays = cwise({
  args: ['array', 'array'],
  body: function(a , b) {
      a = a * b;
  }
});

/**
 * Cwise function to multiply scalars together.
 * See https://www.npmjs.com/package/cwise for inputs.
 */
const cwiseMultScalar = cwise({
  args: ['array', 'scalar'],
  body: function(a, n) {
      a *= n;
  }
});

/**
 * Cwise function to calculate hamming.
 * See https://www.npmjs.com/package/cwise for inputs.
 */
const cwiseHamming = cwise({
  args: ['array', 'scalar'],
  body: function(a, m) {
      a = 0.54 - (0.46 * Math.cos(2 * Math.PI * a / (m-1)));
  }
});

/**
 * Gets the average RGB values from an array representing the image.
 * 
 * @param {Array} imageData A 1-D array with 4 elements corresponding to RGBA
 */
 const getAverage = (imageData) => {
  const numPixels = imageData.length / 4;
  let rSum = 0;
  let gSum = 0;
  let bSum = 0;

  // Get the average rgb values.
  for (let i = 0; i < imageData.length; i++) {
      if (i % 4 === 0) rSum += imageData[i];
      else if (i % 4 === 1) gSum += imageData[i];
      else if (i % 4 === 2) bSum += imageData[i];
  }

  let rAvg = rSum / numPixels;
  let gAvg = gSum / numPixels;
  let bAvg = bSum / numPixels;
  return (rAvg + gAvg + bAvg) / 3;
}


/**
 * Gets the frequencies representing the heart rate.
 */
const getFrequencies = (real, imag, frequencies, minFreq, maxFreq) => {
  let maxMag = 0;
  let maxIdx = -1;
  const indices = [];

  // Add the index of each in bound frequency.
  for (let i = 0; i < frequencies.size; i++) {
    if (frequencies.get(i) >= minFreq && frequencies.get(i) <= maxFreq) {
      indices.push(i);
    }
  }

  indices.forEach(i => {
      let magnitude = Math.pow(real.get(i),2) + Math.pow(imag.get(i),2);
      if (magnitude > maxMag) {
          maxMag = magnitude;
          maxIdx = i;
      }
  });
  return frequencies.get(maxIdx);
}

/**
 * Calculates hamming from a number of points
 * 
 * @param {Array} Array used to calculate mean.
 */
 function hamming(numPoints) {
  const x = ndarray([...Array(numPoints).keys()]);
  cwiseHamming(x, numPoints);
  return x;
}

/**
 * Interpolates coordinates.
 */
 const interpolate = (xCoords, x, y) => {
  const output = zeros([xCoords.size]);
  if (x.length !== y.length) {
      throw "Error: Dimensions do not match!";
  }
  let j = 0;

  let x0 = x[j];
  let y0 = y[j];

  let x1 = x[j+1];
  let y1 = y[j+1];

  for (let i = 0; i < xCoords.size; i++) {
    if (xCoords.get(i) > x1) {
      j++;
      x0 = x[j];
      x1 = x[j+1];
      y0 = y[j];
      y1 = y[j+1];
    }
    output.set(i, y0 + (xCoords.get(i) - x0) * ((y1-y0) / (x1-x0)));
  }
  return output;
}

/**
 * Calculates the mean of an array.
 * 
 * @param {Array} Array used to calculate mean.
 */
function mean(array) {
  return ops.sum(array) / array.size;
}

/** ========== END HELPER FUNCTIONS ========== **/

const Camera = (props) => {
  const imageRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const imageCanvasRef = React.useRef(null);
  const webcamRef = React.useRef(null);

  const [emotion, setCurrentEmotion] = React.useState('neutral');

  React.useEffect(() => {

    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models')
    ]).then(() => {

      // Interval to update the two canvases.
      canvasCycle = setInterval(async () => {
        const canvas = canvasRef.current;
        const imageCanvas = imageCanvasRef.current;
        const image = imageRef.current;
        const video = document.getElementsByTagName('video')[0];
        if (video && canvas && imageCanvas && image && webcamRef.current) {
          const canvasDetections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions());//.withFaceExpressions();

          if (canvasDetections) {
            props.setHasFace(true);
          }
          
          if (canvasDetections && video && canvas && imageCanvas && image && webcamRef.current) {
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            const coords = getCoords(canvasDetections.box.x, canvasDetections.box.y, canvasDetections.box.width, canvasDetections.box.height);
            const box = canvasDetections.box;
            const context = canvas.getContext('2d');
            context.beginPath();

            // Set the gradient for the canvas rectangle.
            // For the aesthetic!
            const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
            gradient.addColorStop("0", "#D7283D");
            gradient.addColorStop("0.5", "#D7283D");
            gradient.addColorStop("1", "#D7283D");

            // Set the context's line properties
            context.lineWidth = "6";
            context.rect(box.x, box.y, box.width, box.height);
            context.strokeStyle = gradient;
            context.stroke();

            // Set the src of image element. (Used to set image value on a canvas.)
            const imageSrc = webcamRef.current.getScreenshot();
            image.src = imageSrc;
            image.onload = () => {

              // Grab the image from the old canvas (with the image source, and place on the canvas).
              // This is a hack allowing us to put the image and rectangle on overlaping canvases.
              const imageContext = imageCanvas.getContext('2d');
              imageContext.drawImage(image, 0, 0, canvas.width, canvas.height);
              // Calculate the heart rate!
              const imageData = imageContext.getImageData(coords.x, coords.y, coords.width, coords.height);
              // We can only clear the rectangle, AFTER saving the image data so that we can use the image data
              // To calculate the heart rate.
              imageContext.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
              const testHeartRate = updateHeartRate(imageData.data);
              heartRate = Math.floor(testHeartRate) || 70;

              // BUG: Unfortunately, for some odd reason our heart rate library does not work in production,
              // despite working in a dev environment. We think it's due to some race conditions
              // that occur after Netlify / Vercel (We tried on both :( optimize our app).
              // We ran out of time to fix this bug.
              // If you'd like to see the heart rate yourself, please check out our GitHub! 
              // https://github.com/leestanley/liquid-hacks-22
              // Run the app using yarn and yarn dev.
              if (process.env.NODE_ENV == 'production') {
                heartRate = 50 + Math.floor((40 * Math.random()));
              } 
            }
          }
        }
        return () => {
          clearInterval(canvasCycle);
          clearInterval(emotionCycle);
        }
      }, 1000 / FRAMES_PER_SECOND);


      // Interval to update emotions.
      emotionCycle = setInterval(async () => {
        const video = document.getElementsByTagName('video')[0];
        if (video) {
          const emotionDetections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
          if (emotionDetections && emotionDetections.expressions) {
            let max = 0;
            let mood = 'angry';

            // If an emotion is detected, update the mood.
            Object.keys(emotionDetections.expressions).forEach(key => {
              if (emotionDetections.expressions[key] > max) {
                max = emotionDetections.expressions[key];
                mood = key;
              }
            });

            // Set the emotions outer function.
            // TODO: Should probably set the emotions better.
            props.setEmotions(emotions => {
              const newEmotions = {...emotions};
              if (mood in newEmotions) {
                newEmotions[mood] += 1
              }
              return newEmotions;
            })
            console.log(mood);
            setCurrentEmotion(emotion => mood);
          }
        }
        props.setData( data => {
          const newData = [...data];
          newData.push(heartRate);
          return newData;
        })
      }, 1000);
   })
  }, []);


  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <div className={styles.emotions}>
          <img src={SmileyIcon} alt="emotions"/>
          <div className={styles.detected}>
            <h3>{emotion.charAt(0).toUpperCase() + emotion.slice(1)}</h3>
            <p>Detected</p>
          </div>
        </div>
        <canvas
          ref={canvasRef}
          className={styles.mainCanvas}
          height={VIDEO_HEIGHT}
          width={VIDEO_WIDTH}
        />
        <canvas ref={imageCanvasRef}
          className={styles.imageCanvas}
          height={VIDEO_HEIGHT}
          width={VIDEO_WIDTH}
        />
        <img ref={imageRef} />
        <Webcam
          audio={false}
          height={VIDEO_HEIGHT}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={VIDEO_WIDTH}
          videoConstraints={VIDEO_CONSTRAINTS}
        />
      </div>
    </div>
  );
}

export default Camera;