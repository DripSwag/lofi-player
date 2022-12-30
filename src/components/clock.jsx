import React, { useState, useEffect } from 'react';

function Clock(){
  const [seconds, setSeconds] = useState(0)
  const [active, setActive] = useState(false)
  const [study, setStudy] = useState(true)

  const startTimer = () => {
    setActive(!active)
  }

  const changeStudy = () => {
    if(study === true){
      setSeconds(Math.floor(seconds / 4))
    }
    setStudy(!study)
  }

  //AICARA MESSI. Clean this up later. Its just string formatting for the clock
  const secondsMath = (operator) => {
    if(operator === "%"){
      if(seconds % 60 < 10){
        return `0${seconds % 60}`
      }
      else{
        return seconds % 60
      }
    }
    else{
      if(Math.floor(seconds / 60) < 10){
        return `0${Math.floor(seconds / 60)}`
      }
      else{
        return Math.floor(seconds / 60)
      }
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if(active && study){
        setSeconds((seconds) => seconds + 1)
      }
      else if(active && !study && seconds === 0){
        setStudy(true)
        setActive(false)
      }
      else if(active && !study){
        setSeconds((seconds) => seconds - 1)
      }
    }, 1000)

    return () => clearInterval(interval)
  });

  return(
    <div>
      <h1>{secondsMath("//")}:{secondsMath("%")}</h1>
      <p>{study ? "Studying" : "Resting"}</p>
      <button onClick={startTimer}>{active ? "Stop" : "Start"}</button>
      <button onClick={changeStudy}>Change Section</button>
    </div>
  );
}
export default Clock
