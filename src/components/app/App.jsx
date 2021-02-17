import React, { useReducer } from 'react';

const initialState = {
  index: 0,
  history: ['#0000FF']
};

function reducer(state, action) {
  switch(action.type) {
    case 'undo':
      return { 
        ...state,
        index: state.index - 1
      };
    case 'redo':
      return { 
        ...state,
        index: state.index + 1
      };
    case 'input': {
      const oldArray = [...state.history];
      const newArray = oldArray.filter((value, index) => index <= state.index);

      return { 
        ...state,
        index: state.index + 1,
        history: [...newArray, action.payload]
      };
    }
    default:
      state;
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <div>Color Changer</div>
      <button onClick={() => dispatch({ type: 'undo' })}>undo</button>
      <button onClick={() => dispatch({ type: 'redo' })}>redo</button>
      <input 
        data-testid="selector"
        name="selector"
        type="color" 
        value={state.history[state.index]} 
        onChange={({ target }) => dispatch({ 
          type: 'input', 
          payload: target.value
        })}
      />
      <div 
        data-testid="output" 
        style={{ 
          backgroundColor: state.history[state.index], 
          width: '10rem', 
          height: '10rem' 
        }}></div>
    </>
  );
}

export default App;
