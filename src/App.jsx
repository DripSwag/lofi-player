import SoundEffectPlayer from './components/soundEffectPlayer.jsx'
import fire from './assets/fire.mp3'
import AudioPlayer from './components/audioPlayer.jsx';
import React, { useState, useEffect, useCallback } from 'react'
import { Cookies, CookiesProvider, useCookies } from 'react-cookie';
import Clock from './components/clock.jsx'
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
      setCookie(key, String(cookieDictionary[key]), { sameSite: 'Strict' })
    }
  }, [cookieDictionary])

  useEffect(() => {
    makeCookie()
  }, [makeCookie])

  return (
    <CookiesProvider>
      <SoundEffectPlayer sound={fire} name={"Fire"} changeDictionary={changeDictionary} cookies={cookies}/>
      <AudioPlayer changeDictionary={changeDictionary} cookies={cookies}/>
      <Clock />
    </CookiesProvider>
  );
}
export default App;
