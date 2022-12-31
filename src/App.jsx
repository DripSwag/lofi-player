import SoundEffectPlayer from './components/soundEffectPlayer.jsx'
import fire from './assets/fire.mp3'
import rain from './assets/rain.mp3'
import wind from './assets/wind.mp3'
import AudioPlayer from './components/audioPlayer.jsx';
import React, { useState, useEffect, useCallback } from 'react'
import { Cookies, CookiesProvider, useCookies } from 'react-cookie';
import Clock from './components/clock.jsx'
import background from './assets/temp.jpg'
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
      <section className={`h-screen overflow-auto text-white bg-cover font-sans-roboto`} style={{ backgroundImage: `url(${background})` }}>
        <div className='bg-neutral-800 rounded-xl w-min p-1 m-3 border-2 border-neutral-600'>
          <SoundEffectPlayer sound={fire} name={"Fire"} changeDictionary={changeDictionary} cookies={cookies}/>
          <SoundEffectPlayer sound={wind} name={"Wind"} changeDictionary={changeDictionary} cookies={cookies}/>
          <SoundEffectPlayer sound={rain} name={"Rain"} changeDictionary={changeDictionary} cookies={cookies}/>
        </div>
        <AudioPlayer changeDictionary={changeDictionary} cookies={cookies} />
        <Clock />
      </section>
    </CookiesProvider>
  );
}
export default App;
