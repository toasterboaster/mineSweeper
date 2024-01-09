import './App.css'
import React, { useReducer, useEffect } from 'react'
import Box from './Box.jsx'
import GameOver from './GameOver.jsx'


export default function App() {
  const [boxArray, setBoxArray] = React.useState([...Array(64)].map((_, i) => ({
    key: i,
    isClicked: false,
    index: i,
    isMine: false,
    numOfMines: 0,
    isFlagged: false
  })));
  const [gameOver, setGameOver] = React.useState(false);
  const [restart, setRestart] = React.useState(false);


  function handleClick(i,event) {
    const newBoxArray = [...boxArray];
    newBoxArray[i].isClicked = true;
    setBoxArray(newBoxArray);
    if (newBoxArray[i].numOfMines == 0){
      checkZeros(i, newBoxArray)
    }
    if (newBoxArray[i].isClicked && newBoxArray[i].isMine){
      setGameOver(true)
    }
    console.log(boxArray[i])
    console.log(i)
  }

  function checkZeros(currentBox, boxArray){
    let arr = [-9,-8,-7,-1,1,7,8,9];
    arr.forEach(index => {
      if (boxArray[currentBox + index].numOfMines == 0){
        boxArray[currentBox + index].isClicked = true
      }
    })
  }
  
React.useEffect(() => {
  function assignMines() {
    let indices = new Set();
    while(indices.size < 10) {
      indices.add(Math.floor(Math.random() * 64));
    }
    console.log(indices)
    const newBoxArray = [...boxArray];
    indices.forEach(index => {
      newBoxArray[index].isMine = true;
    });
    setBoxArray(newBoxArray);
  }
  assignMines();
  
  const newBoxArrayAfterMines = [...boxArray];
  for (let i = 0; i < newBoxArrayAfterMines.length; i++){
    let arr = [-9,-8,-7,-1,1,7,8,9];
    let num = 0;
    let left = [0,8,16,24,32,40,48,56];
    let right = [7,15,23,31,39,47,55,63];
    let leftArr = [-8,-7,1,8,9];
    let rightArr = [-9,-8,-1,7,8];
    if (left.includes(i)){
      leftArr.forEach((x) => {
        if(newBoxArrayAfterMines[i + x] === undefined){
          return;
        }
        if (newBoxArrayAfterMines[i + x].isMine){
          num += 1
        }
      })
    } else if (right.includes(i)){
      rightArr.forEach((x) => {
        if(newBoxArrayAfterMines[i + x] === undefined){
          return;
        }
        if (newBoxArrayAfterMines[i + x].isMine){
          num += 1
        }
      })
    } else {
    arr.forEach((x,index) => {
      if(newBoxArrayAfterMines[i + x] === undefined){
        return;
      }
      if (newBoxArrayAfterMines[i + x].isMine){
        num += 1
      }
    })
    }
    newBoxArrayAfterMines[i].numOfMines = num;
    num = 0;
  }
  setBoxArray(newBoxArrayAfterMines);
}, [restart]);

const handleContextMenu = (i,event) => {
    event.preventDefault(); // Prevent the default context menu from appearing
  const newBoxArray = [...boxArray];
  newBoxArray[i].isFlagged = !newBoxArray[i].isFlagged;
  setBoxArray(newBoxArray);
    console.log(newBoxArray[i]);
  }

function restartGame(){
  setBoxArray([...Array(64)].map((_, i) => ({
    key: i,
    isClicked: false,
    index: i,
    isMine: false,
    numOfMines: 0,
    isFlagged: false
  })));
  setGameOver(false);
  setRestart(prevState => !prevState); // Toggle the restart state to trigger useEffect
}

  return (
    <main>
      <div className='page'>
        <div className='game-container'>
          {boxArray.map((box, i) => 
            <Box
              key={box.key}
              isClicked={box.isClicked}
              index={box.index}
              isMine={box.isMine}
              numOfMines={box.numOfMines}
              onClick={(event) => handleClick(i,event)}
              isFlagged={box.isFlagged}
              onContextMenu={(event) => handleContextMenu(i,event)}
              />
          )}
        </div>
        {gameOver && <GameOver
                       restart={restartGame}/>}
      </div>
      
    </main>
  )
}
