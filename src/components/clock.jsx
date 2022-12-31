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
    <div className='bg-neutral-800 rounded-xl w-min p-3 m-3 border-2 border-neutral-600 ' >
      <div className='p-0 my-4'>
        <h1 className='text-5xl'>{secondsMath("//")}:{secondsMath("%")}</h1>
        <p>{study ? "Studying" : "Resting"}</p>
      </div>
      <div className='flex flex-row gap-4'>
        <button onClick={startTimer} className="hover:bg-neutral-700 whitespace-nowrap rounded-xl border-2 border-neutral-700 py-2 px-4">{active ? "Stop" : "Start"}</button>
        <button onClick={changeStudy} className={`${active ? "invisible" : "block"} hover:bg-neutral-700 whitespace-nowrap rounded-xl border-2 border-neutral-700 py-2 px-4`}>Change Section</button>
      </div>
    </div>
  );
}
export default Clock
