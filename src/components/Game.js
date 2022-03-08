import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Box from './components-for-game/GameTargetingBox';
import GameHeader from "./components-for-game/GameHeader";
import PromptBox from "./components-for-game/PromptBox";

import { db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";

const Game = () => {
  const location = useLocation();
  const imageNumber = location.state?.imageNumber??1;
  const [currentCoor, setCurrentCoor] = useState({ x:0, y:0 });
  const [style, setStyle] = useState({left:0, top:0, width:0, height:0});
  const [boxVisible, toggleBox] = useState(false);//write your own hook
  const [header, setHeader] = useState('WANTED:');
  const [foundChar, setFoundChar] = useState([]);
  const [startTime, setStartTime] = useState(Date.now())
  const [isGameOver, setIsGameOver] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [imgSrc, setImgSrc] = useState('');

  let [boxWidth, boxHeight] = [150, 120];


  //starting game
  useEffect(() => {
    const getCoordinatesFirestore = async () => {
      const docRef = doc(db, "game", "coordinates");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCoordinates(docSnap.data());
      } else {
        throw new Error('No such document!');
      }
    };

    const getImgSrc = async () => {
      const docRef = doc(db, "game", "images-sources");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setImgSrc(docSnap.data());
      } else {
        throw new Error('No such document!');
      }
    }

    const getDataFirestore = async () => {
      await Promise.all([getImgSrc(), getCoordinatesFirestore()]);
    }

    getDataFirestore();

  }, [])

  useEffect(() => {
    setIsGameOver(false);
    setStartTime(Date.now());
  }, [coordinates]);

  //check if we should end the game
  useEffect(() => {
    if(coordinates) {
      if(Object.keys(coordinates[imageNumber]).every(name=>foundChar.includes(name))) {
        setIsGameOver(true);
      }
    }
  }, [foundChar, coordinates, imageNumber])

  function displayBox(e) {
    let [x, y] = [e.nativeEvent.offsetX, e.nativeEvent.offsetY];
    let [relX, relY] = [x/e.currentTarget.offsetWidth, y/e.currentTarget.offsetHeight]
    setCurrentCoor({x:relX, y:relY});
    setStyle({left: (x/e.currentTarget.offsetWidth<=0.5) ? x : x-boxWidth, top: y, width: boxWidth, height: boxHeight});
    toggleBox(true);
  }

  function checkChoice(name) {
    const equalObjects = (obj1, obj2) => {
        if(
          (Math.abs(obj1.x.toFixed(3) - obj2.x.toFixed(3))<0.009)
          &&(Math.abs(obj1.y.toFixed(3) - obj2.y.toFixed(3))<0.04)) {
          return true;
        }
        return false;
    }
    if(equalObjects(coordinates[imageNumber][name], currentCoor)) {
      setHeader('YOU ARE RIGHT!');
      setFoundChar(prChar => [...prChar, name]);
      toggleBox(false);
    } else {
      setHeader('sorry, you got it wrong');
    }
  }

  if(!coordinates) {
    return (
      <div>Loading...</div>
    )
  }
  return (
    <div>
      <div id="header-container">
        <Link to='/'>Home</Link><br />
        <GameHeader names={Object.keys(coordinates[imageNumber])} header={header} foundChar={foundChar} />
      </div>
      <div className="game-main-screen">
      <div className="wrapping-image">        
        <img 
        src={imgSrc[imageNumber]} 
        alt='1' 
        className="broad-image"
        onClick={ displayBox }
        >
        </img>
        {boxVisible 
        ? <Box 
          style={style} 
          openBox={toggleBox} 
          choices={Object.keys(coordinates[imageNumber])} 
          checkChoice={checkChoice} /> 
        : null}
      </div>
      </div>
      {isGameOver ? (<PromptBox userTime={(Date.now()-startTime)/1000} imageNumber={imageNumber} />) : null}
    </div>
  )
}

export default Game;