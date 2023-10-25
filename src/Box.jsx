import React from 'react'

export default function Box(props){
  return (
    <div 
      className="box" 
      onClick={props.onClick}
      onContextMenu={props.onContextMenu}>
      {props.isClicked && props.isMine ? <img src="https://cdn-icons-png.flaticon.com/512/3325/3325047.png" alt="X" style={{width: '100%', height: '100%', objectFit: 'contain'}}/> : ""}
      {props.isClicked && !props.isMine ? props.numOfMines : ''}
      {props.isFlagged ? 'O' : ''}
    </div>
  )
}