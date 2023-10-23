import React from 'react'

export default function Box(props){
  return (
    <div className="box" onClick={props.onClick}>
      {props.isClicked && props.isMine ? 'X' : ""}
      {props.isClicked && !props.isMine ? props.numOfMines : ''}
    </div>
  )
}