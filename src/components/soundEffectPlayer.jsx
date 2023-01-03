import { useState, useEffect } from "react";

function SoundEffectPlayer({ sound, name }) {
  let [audio] = useState(new Audio(sound)); 
  let [playing, setPlaying] = useState(false);
  let [volume, setVolume] = useState((localStorage.getItem(name) === null) ? 0.5 : localStorage.getItem(name))
  
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
    localStorage.setItem(name, volume)
  }, [volume, setVolume, audio, name])

  return (
    <div className="mx-2 my-4 p-2 border-2 border-neutral-700 rounded-xl"> 
      <button onClick={playAudio}>{playing ? "Stop" : name}</button>
      <input type="range" max="100" min="0" className="accent-[#A7C7E7]" onChange={(event) => setVolume(event.target.value / 100)} value={String(volume * 100)}></input>
    </div>
  );
}

export default SoundEffectPlayer;

