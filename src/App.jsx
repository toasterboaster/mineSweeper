import './App.css'
import React, { useReducer, useEffect } from 'react'
import Box from './Box.jsx'


export default function App() {
  const [boxArray, setBoxArray] = React.useState([...Array(64)].map((_, i) => ({
    key: i,
    isClicked: false,
    index: i,
    isMine: false,
    numOfMines: 0
  })));
/*
  let boxArray = [...Array(64)].map((_, i) =>
    <Box
      key={i}
      isClicked={false}
      index={i}
      click={() => { console.log(i) }} />
  )
*/
  /*
  let boxArray = [...Array(64)].map((_, i) => ({
    key: i,
    isClicked: false,
    index: i,
    click: function () {console.log(this.isMine) },
    trial: function () {trythis(this)},
    isMine: false
  }))
*/

  function handleClick(i) {
    const newBoxArray = [...boxArray];
    newBoxArray[i].isClicked = true;
    setBoxArray(newBoxArray);
    console.log(boxArray[i])
  }
/*
function trythis(box){
  box.isClicked = true
  console.log(box.isClicked)
}*/

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
}, []);


  return (
    <main>
      <div className='page'>
        <div className='game-container'>
          {boxArray.map((box, i) => 
            <Box
              key={box.key}
              isClicked={box.isClicked}
              index={box.index}
              //click={box.click.bind(box)}
              //trial={box.trial.bind(box)}
              isMine={box.isMine}
              numOfMines={box.numOfMines}
              onClick={() => handleClick(i)}
              />
          )}
        </div>
      </div>
    </main>
  )
}
