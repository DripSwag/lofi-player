import trance from './assets/Y2Mate.is - Trance - 009 Sound System Dreamscape (HD)-TKfS5zVfGBc-128k-1657378497730.mp3'
import SoundEffectPlayer from './components/soundEffectPlayer.jsx'
import AudioPlayer from './components/audioPlayer.jsx';
import React, { useState } from 'react'
import './App.css';

function App() {
  let [cookieDictionary, setCookieDictionary] = useState({})

  //This is messy but it works so im not touching this
  const changeDictionary = (key, value) => {
    if(key in cookieDictionary){
      setCookieDictionary(prevDict => ({
        ...prevDict,
        [key]: value
      }))
    }
    else{
      setCookieDictionary(prevDict => ({
        ...prevDict,
        [key]: value,
      }))
    }
  }

  const showCookie = () =>{
    console.log(cookieDictionary)
  }

  return (
    <div>
      <SoundEffectPlayer sound={trance} name={"Fire"} changeDictionary={changeDictionary}/>
      <AudioPlayer changeDictionary={changeDictionary}/>
      <button onClick={showCookie}>Show Cookie</button>
    </div>
  );
}
export default App;
