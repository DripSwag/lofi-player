import { useState, useEffect } from "react";

function SoundEffectPlayer({ sound, name, changeDictionary }) {
  let [audio] = useState(new Audio(sound)); 
  let [playing, setPlaying] = useState(false);
  let [volume, setVolume] = useState(0.5)

  
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
    <div> 
      <button onClick={playAudio}>{playing ? "Stop" : name}</button>
      <input type="range" max="100" min="0" onChange={(event) => setVolume(event.target.value / 100)}></input>
    </div>
  );
}

export default SoundEffectPlayer;

