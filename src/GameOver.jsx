import React from 'react'

export default function GameOver(props){
  return (
    <div className='gameover'>
    GAME OVER!
      <button onClick={props.restart}>Restart!</button>
    </div>
    
  )
}