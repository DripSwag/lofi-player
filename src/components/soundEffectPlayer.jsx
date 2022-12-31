import { useState, useEffect } from "react";

function SoundEffectPlayer({ sound, name, changeDictionary, cookies, icon }) {
  let [audio] = useState(new Audio(sound)); 
  let [playing, setPlaying] = useState(false);
  let [volume, setVolume] = useState(() => {
    if (cookies[name] != undefined){
      return cookies[name]
    }
    else{
      return 0.5 
    }
  })

  
  const playAudio = () => {
    if(!playing){
      audio.play();
      audio.loop = true
      setPlaying(true);
    }
    else{
      audio.pause();
      setPlaying(false);
    }
  }

  useEffect(() => {
    setVolume(volume)
    audio.volume = volume
    changeDictionary(name, volume)
  }, [volume, setVolume, audio])

  return (
    <div className="mx-2 my-4 p-2 border-2 border-neutral-700 rounded-xl"> 
      <button onClick={playAudio}>{playing ? "Stop" : name}</button>
      <input type="range" max="100" min="0" className="accent-[#A7C7E7]" onChange={(event) => setVolume(event.target.value / 100)} value={String(cookies[name] * 100)}></input>
    </div>
  );
}

export default SoundEffectPlayer;

