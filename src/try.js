export default function App() {
  /*
  const [boxArray, setBoxArray] = React.useState([...Array(64)].map((_, i) => ({
    key: i,
    isClicked: false,
    index: i,
    isMine: false
  })));
  */
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
/*
  function handleClick(i) {
    const newBoxArray = [...boxArray];
    newBoxArray[i].isClicked = true;
    setBoxArray(newBoxArray);
  }

function trythis(box){
  box.isClicked = true
  console.log(box.isClicked)
}

React.useEffect(() => {
  function assignMines() {
    let indices = new Set();
    while(indices.size < 10) {
      indices.add(Math.floor(Math.random() * 64));
    }
    const newBoxArray = [...boxArray];
    indices.forEach(index => {
      newBoxArray[index].isMine = true;
    });
    setBoxArray(newBoxArray);
/*
    indices.forEach(index => {
      boxArray[index].isMine = true;
    });
    console.log(indices)*/
  //}
/*
  assignMines();
}, []);
*/

const initialState = [...Array(64)].map((_, i) => ({
  key: i,
  isClicked: false,
  index: i,
  isMine: false
}));

function reducer(state, action) {
  switch (action.type) {
    case 'click':
      return state.map((box, i) => 
        i === action.index ? { ...box, isClicked: true } : box
      );
    case 'assignMines':
      let indices = new Set();
      while(indices.size < 10) {
        indices.add(Math.floor(Math.random() * 64));
      }
      return state.map((box, i) => 
        indices.has(i) ? { ...box, isMine: true } : box
      );
    default:
      return state;
  }
}

const [boxArray, dispatch] = useReducer(reducer, initialState);

useEffect(() => {
  dispatch({ type: 'assignMines' });
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
              //onClick={() => handleClick(i)}
              dispatch={dispatch}/>
          )}
        </div>
      </div>
    </main>
  )
}
