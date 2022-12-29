import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';

function AudioPlayer({ changeDictionary, cookies }){
  let [playingAudio, setPlayingAudio] = useState(false)
  let [audioVolume, setAudioVolume] = useState(() => {
    if (cookies.Audio != undefined){
      return cookies.Audio
    }
    else{
      return null
    }
  })

  const playAudio = () => {
    setPlayingAudio(!playingAudio)
  } 

  //I have to call setAudioVolume twice because the onChange isnt on render, its after render. The first time the slider is clicked, nothing is registered because the input is not saved until after the render.
  useEffect(() => {
    setAudioVolume(audioVolume)
    changeDictionary("Audio", audioVolume)
  }, [setAudioVolume, audioVolume])

  return (
    <div>
      <button onClick={playAudio}>{playingAudio ? "Pause" : "Play"}</button>
      <input type="range" max='100' min='0' onChange={(event) => setAudioVolume(parseFloat(event.target.value) / 100)} value={String(audioVolume * 100)}></input>
      <ReactPlayer url='https://www.youtube.com/watch?v=jfKfPfyJRdk&ab_channel=LofiGirl' playing={playingAudio} width='0' height="0" volume={audioVolume} loop={true} />
    </div>
  ); 
}  

export default AudioPlayer;
