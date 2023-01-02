import SoundEffectPlayer from './components/soundEffectPlayer.jsx'
import fire from './assets/fire.mp3'
import rain from './assets/rain.mp3'
import wind from './assets/wind.mp3'
import AudioPlayer from './components/audioPlayer.jsx';
import React from 'react'
import Clock from './components/clock.jsx'
import background from './assets/temp.jpg'
import './App.css';

function App() {
  const splitCookie = (key) => {
    if(document.cookie.split("; ").find((row) => row.startsWith(key)) === undefined){
      return 0.5
    }
    else{
      return document.cookie.split("; ").find((row) => row.startsWith(key)).split("=")[1]
    }
  }

  return (
    <div>
      <section className={`h-screen overflow-auto text-white bg-cover font-sans-roboto`} style={{ backgroundImage: `url(${background})` }}>
        <div className='bg-neutral-800 rounded-xl w-min p-1 m-3 border-2 border-neutral-600'>
          <SoundEffectPlayer sound={fire} name={"Fire"} splitCookie={splitCookie} />
          <SoundEffectPlayer sound={wind} name={"Wind"} splitCookie={splitCookie} />
          <SoundEffectPlayer sound={rain} name={"Rain"} splitCookie={splitCookie} />
        </div>
        <AudioPlayer  splitCookie={splitCookie} />
        <Clock />
      </section>
    </div>
  );
}
export default App;
