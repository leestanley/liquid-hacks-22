import * as THREE from 'three';
import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import KeyGraphic from './assets/key.svg';
import MoodIcon from './assets/mood_icon.svg';

import styles from '../../../../styles/components/postgame/analytics/MoodMap.module.scss';

// Sample data is in the form of an array of tuples
// Each tuple contains the following values
// [mood, weight, location between start / end]
const sampleData = [
  ['angry', 0.1, 0.1, Math.random() * 100],
  ['neutral', 0.2, 0.2, Math.random() * 100],
  ['angry', 0.4, 0.3, 0],
  ['neutral', 0.6, 0.4, Math.random() * 100],
  ['happy', 0.7, 0.5, Math.random() * 100],
  ['surprised', 0.5, 0.6, Math.random() * 100],
  ['fearful', 0.5, 0.7, Math.random() * 100],
  ['sad', 0.5, 0.8, 0],
  ['disgusted', 0.6, 1, Math.random() * 100],
]

/** ========== CONSTANTS ========== **/

// Map representing the three js colors
const COLOR_ENUM = {
  angry: '#F45060',
  disgusted: '#FC7B33',
  fearful: '#4735AD',
  happy: '#CB9B47',
  neutral: '#8DFFFF',
  sad: '#589FC4',
  surprised: '#9B4AB0',
}

// Light constants. Change these to change the mood map lighting engine.
const AMBIENT_LIGHT_INTENSITY = 0.2;
const POINT_LIGHT_INTENSITY= 1.1;
const POINT_LIGHT_X = 200;
const POINT_LIGHT_Y = 100;
const POINT_LIGHT_Z = 80;

// Settings for the Three.js canvas.
const CANVAS_GL_SETTINGS = {
  alpha: false,
};

// Settings for the Three.js camera.
const CANVAS_CAMERA_SETTINGS = {
  position: [0, 0, 100],
};

/** ========== END CONSTANTS ========== **/

/** ========== HELPER FUNCTIONS ========== **/

function onCreated(state) {
  if (state.gl) {
    state.gl.setClearColor('#FFFFFF', 0);
  }
}

/** ========== END HELPER FUNCTIONS ========== **/

function Spheres({count, color, sampleData }) {
  const angryMesh = React.useRef();
  const disgustedMesh = React.useRef();
  const fearfulMesh = React.useRef();
  const happyMesh = React.useRef();
  const neutralMesh = React.useRef();
  const sadMesh = React.useRef();
  const surprisedMesh = React.useRef();

  const sphereObject = React.useMemo(() => new THREE.Object3D(), []);
  const sphereData = React.useMemo(() => {
    const tempSphereData = {
      angry: [],
      disgusted: [],
      fearful: [],
      happy: [],
      neutral: [],
      surprised: [],
      sad: [],
    };
    sampleData.forEach((dataEntry) => {
      const sizeFactor = dataEntry[1];
      const locationFactor = dataEntry[2];


      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;

      const newObject = { sizeFactor, t, factor, speed, locationFactor }

      switch (dataEntry[0]) {
        case 'angry':
          tempSphereData.angry.push(newObject);
          break;
        case 'disgusted':
          tempSphereData.disgusted.push(newObject);
          break;
        case 'fearful':
          tempSphereData.fearful.push(newObject);
          break;
        case 'happy':
          tempSphereData.happy.push(newObject);
          break;
        case 'neutral':
          tempSphereData.neutral.push(newObject);
          break;
        case 'surprised':
          tempSphereData.surprised.push(newObject);
          break;
        default:
          tempSphereData.sad.push(newObject);
      }

    })
    return tempSphereData;
  }, [sampleData]);

  useFrame(state => {
    for (const [key, dataArray] of Object.entries(sphereData)) {
      dataArray.forEach((particle, i) => {
        let { sizeFactor, t, factor, speed, xFactor, yFactor, zFactor, locationFactor } = particle; 
        
        let location = 0
        if (locationFactor < 0.5) {
          location = 100 * -((0.5 - locationFactor) * 2)
        } else if (locationFactor > 0.5) {
          location = 100 * (locationFactor - 0.5) * 2
        }
        
        sphereObject.position.set(location, 0, 0);

        // Set the size of the sphere
        const size = sizeFactor * 10 + 2.5;
        sphereObject.scale.set(size, size, size);
        sphereObject.updateMatrix();

        switch (key) {
          case 'angry':
            angryMesh.current.setMatrixAt(i, sphereObject.matrix);
            break;
          case 'disgusted':
            disgustedMesh.current.setMatrixAt(i, sphereObject.matrix);
            break;
          case 'fearful':
            fearfulMesh.current.setMatrixAt(i, sphereObject.matrix);
            break;
          case 'happy':
            happyMesh.current.setMatrixAt(i, sphereObject.matrix);
            break;
          case 'neutral':
            neutralMesh.current.setMatrixAt(i, sphereObject.matrix);
            break;
          case 'surprised':
            surprisedMesh.current.setMatrixAt(i, sphereObject.matrix);
            break;
          default:
            sadMesh.current.setMatrixAt(i, sphereObject.matrix);
          }
      });
    }
    angryMesh.current.instanceMatrix.needsUpdate = true;
    disgustedMesh.current.instanceMatrix.needsUpdate = true;
    fearfulMesh.current.instanceMatrix.needsUpdate = true;
    happyMesh.current.instanceMatrix.needsUpdate = true;
    neutralMesh.current.instanceMatrix.needsUpdate = true;
    sadMesh.current.instanceMatrix.needsUpdate = true;
    surprisedMesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={angryMesh} args={[null, null, sphereData.angry.length]}>
        <sphereBufferGeometry attach="geometry" args={[1, 50, 50]} />
        <meshPhongMaterial attach="material" color={COLOR_ENUM.angry} />
      </instancedMesh>
      <instancedMesh ref={disgustedMesh} args={[null, null, sphereData.disgusted.length]}>
        <sphereBufferGeometry attach="geometry" args={[1, 50, 50]} />
        <meshPhongMaterial attach="material" color={COLOR_ENUM.disgusted} />
      </instancedMesh>
      <instancedMesh ref={fearfulMesh} args={[null, null, sphereData.fearful.length]}>
        <sphereBufferGeometry attach="geometry" args={[1, 50, 50]} />
        <meshPhongMaterial attach="material" color={COLOR_ENUM.fearful} />
      </instancedMesh>
      <instancedMesh ref={happyMesh} args={[null, null, sphereData.happy.length]}>
        <sphereBufferGeometry attach="geometry" args={[1, 50, 50]} />
        <meshPhongMaterial attach="material" color={COLOR_ENUM.happy} />
      </instancedMesh>
      <instancedMesh ref={neutralMesh} args={[null, null, sphereData.neutral.length]}>
        <sphereBufferGeometry attach="geometry" args={[1, 50, 50]} />
        <meshPhongMaterial attach="material" color={COLOR_ENUM.neutral} />
      </instancedMesh>
      <instancedMesh ref={sadMesh} args={[null, null, sphereData.sad.length]}>
        <sphereBufferGeometry attach="geometry" args={[1, 50, 50]} />
        <meshPhongMaterial attach="material" color={COLOR_ENUM.sad} />
      </instancedMesh>
      <instancedMesh ref={surprisedMesh} args={[null, null, sphereData.surprised.length]}>
        <sphereBufferGeometry attach="geometry" args={[1, 50, 50]} />
        <meshPhongMaterial attach="material" color={COLOR_ENUM.surprised} />
      </instancedMesh>
    </>
  );
}


const MoodMap = (props) => (
  <div className={styles.container}>
    <div className={styles.header}>
      <img src={MoodIcon} alt="Mood Icon" />
      <h2>Mood Analytics</h2>
      <p>Based off camera and voice based analysis</p>
    </div>
    <img src={KeyGraphic} className={styles.key} />
    <div className={styles.timeLine}>
      <div className={styles.line}></div>
      <div className={styles.lineMarkers}>
        <h2>{props.startDate}</h2>
        <p>Games over time</p>
        <h2>{props.endDate}</h2>
      </div>
    </div>
    <Canvas
      camera={CANVAS_CAMERA_SETTINGS}
      gl={CANVAS_GL_SETTINGS}
      onCreated={onCreated}
    >
      <Spheres count={2} color={"#8DFFFF"} sampleData ={sampleData} />
      <ambientLight intensity={AMBIENT_LIGHT_INTENSITY} />
      <pointLight position={[POINT_LIGHT_X, POINT_LIGHT_Y, POINT_LIGHT_Z]} intensity={POINT_LIGHT_INTENSITY} />
    </Canvas>
  </div>
);

export default MoodMap;