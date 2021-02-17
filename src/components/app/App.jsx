import React, { useState, useReducer } from 'react';

const initialState = {
  currentColor: '#0000FF',
  history: []
};


function reducer(state, action) {
  switch(action.type) {
    case 'undo':
      console.log('undo click');
      return;
    case 'redo':
      console.log('redo click');
      return;
    case 'input':
      console.log('input');
      return;
    default:
      throw new Error();
  }
}




// const useRecord = (init) => {
//   const [before, setBefore] = useState([]);
//   const [current, setCurrent] = useState(init);
//   const [after, setAfter] = useState([]);

//   const undo = () => {
//     setAfter(after => [current, ...after]);
//     setCurrent(before[before.length - 1]);
//     setBefore(before => before.slice(0, -1));
//   };

//   const redo = () => {
//     setBefore(before => [...before, current]);
//     setCurrent(after[0]);
//     setAfter(after => after.slice(1));
//   };

//   const record = val => {
//     setBefore(before => [...before, current]);
//     setCurrent(val);
//   };

//   return {
//     undo,
//     record,
//     redo,
//     current,
//   };
// };

function App() {
  // const { current, undo, redo, record } = useRecord('#FF0000');

  const [state, dispatch] = useReducer(reducer, initialState);

  const current = '#0000FF';

  return (
    <>
      <div>Color Changer</div>
      <button onClick={() => dispatch({ type: 'undo' })}>undo</button>
      <button onClick={() => dispatch({ type: 'redo' })}>redo</button>
      <input 
        data-testid="selector"
        name="selector"
        type="color" 
        value={current} 
        onChange={() => dispatch({ type: 'input' })}
        // onChange={({ target }) => record(target.value)} 
      />
      <div 
        data-testid="output" 
        style={{ 
          backgroundColor: current, 
          width: '10rem', 
          height: '10rem' 
        }}></div>
    </>
  );
}

export default App;
