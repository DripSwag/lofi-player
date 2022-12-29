import trance from './assets/Y2Mate.is - Trance - 009 Sound System Dreamscape (HD)-TKfS5zVfGBc-128k-1657378497730.mp3'
import SoundEffectPlayer from './components/soundEffectPlayer.jsx'
import AudioPlayer from './components/audioPlayer.jsx';
import React, { useState, useEffect, useCallback } from 'react'
import { Cookies, CookiesProvider, useCookies } from 'react-cookie';
import './App.css';

function App() {
  let [cookieDictionary, setCookieDictionary] = useState({})
  const [cookies, setCookie] = useCookies()

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

  //useCallback used because its just a code thing. It would infinetly call in useEffect because it has no visual thing to render and its the same visual thing all the time. useCallback does like this cache thing and only calls if the new data is different to cache
  const makeCookie = useCallback(() => {
    for(var key in cookieDictionary){
      setCookie(key, String(cookieDictionary[key]))
    }
  }, [cookieDictionary])

  useEffect(() => {
    makeCookie()
  }, [makeCookie])

  const showCookie = () =>{
    console.log(cookieDictionary)
    console.log(cookies.Fire, cookies.Audio)
  }

  return (
    <CookiesProvider>
      <SoundEffectPlayer sound={trance} name={"Fire"} changeDictionary={changeDictionary}/>
      <AudioPlayer changeDictionary={changeDictionary} cookies={cookies}/>
      <button onClick={showCookie}>Show Cookie</button>
    </CookiesProvider>
  );
}
export default App;
