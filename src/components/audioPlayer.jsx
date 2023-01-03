import React, { useState, useEffect } from 'react';
import one from '../assets/1 A.M Study Session  - [lofi hip hopchill beats].mp3'
import twelve from '../assets/12 A.M Study Session  [lofi hip hopchill beats].mp3'
import three from '../assets/3 A.M Study Session  - [lofi hip hopchill beats].mp3'

function AudioPlayer({ splitCookie }){
  const [playingAudio, setPlayingAudio] = useState(false)
  const [audioVolume, setAudioVolume] = useState(splitCookie("Audio"))
  const [playlist] = useState([one, twelve, three]) 
  const [playListIndex, setPlayListIndex] = useState(Math.floor(Math.random() * 3))
  const [audio] = useState(new Audio(playlist[playListIndex]))

  const playAudio = () => {
    if (playingAudio === true){
      audio.pause()
    }
    else{
      audio.play()
      audio.loop = true
      audio.onended = function(){
        if(playListIndex === 2){
          setPlayListIndex(0)
          audio.src = playlist[playListIndex]
        }
        else{
          setPlayListIndex(playListIndex + 1)
          audio.src = playlist[playListIndex]
        }
      } 
    }
    setPlayingAudio(!playingAudio)
  } 

  //I have to call setAudioVolume twice because the onChange isnt on render, its after render. The first time the slider is clicked, nothing is registered because the input is not saved until after the render.
  useEffect(() => {
    setAudioVolume(audioVolume)
    audio.volume = audioVolume
    document.cookie = `Audio=${audioVolume}; SameSite=None; max-age=31536000; Secure`
  }, [setAudioVolume, audioVolume, audio])

  return (
    <div className='bg-neutral-800 rounded-xl w-min p-3 m-3 border-2 border-neutral-600' >
      <button onClick={playAudio}>{playingAudio ? "Pause" : "Play"}</button>
      <input type="range" max='100' min='0' className="accent-[#A7C7E7]" onChange={(event) => setAudioVolume(parseFloat(event.target.value) / 100)} value={String(audioVolume * 100)}></input>
    </div>
  ); 
}  

export default AudioPlayer;
