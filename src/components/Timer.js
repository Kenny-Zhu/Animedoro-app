import React, { useEffect } from 'react'

function Timer(props) {

  const funcTime = (time) => {    
    const seconds = time % 60;
    const minutes = (time - seconds) / 60 ;
    
    return seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`;
  }

  return (
    <main>
        <div className="timerContainer">
        <div className="Timer">
          {funcTime(props.time)}
        </div>
        <div className="SetTimer">
          <form
            className="timerForm"
            onSubmit={props.handleTSubmit}>
              <input
              type="number"
              className="putTime"
              placeholder="(minutes)"
              value={props.tInput}
              onChange={props.handleTChange}
              />
              <button placeholder="set" onClick={props.handleTSubmit} className="setButton">Set</button>
          </form>
          
        </div>
        <div className="startStop">
          <button placeholder={props.start} onClick={props.handleStartClick} className="startButton">{props.start}</button>
        </div>
        </div>
    </main>
  )
}

export default Timer