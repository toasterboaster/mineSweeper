import React from 'react'

export default function Box(props){
  return (
    <div 
      className="box" 
      onClick={props.onClick}
      onContextMenu={props.onContextMenu}
      style={{backgroundColor: props.isClicked && !props.isMine && props.numOfMines == 0 ? 'blue' : 'initial'}}>
      {props.isClicked && props.isMine ? <img src="https://cdn-icons-png.flaticon.com/512/3325/3325047.png" alt="X" style={{width: '100%', height: '100%', objectFit: 'contain'}}/> : ""}
      {props.isClicked && !props.isMine && props.numOfMines != 0 ? props.numOfMines : ''}
      {props.isFlagged ? <img   src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Flag_icon_red_4.svg/1200px-Flag_icon_red_4.svg.png' alt='O' style={{width: '100%', height: '100%', objectFit: 'contain'}} /> : ''}
    </div>
  )
}