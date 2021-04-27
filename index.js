// reduces state and action to new state
function todos (state = [], action) {
  if (action.type === 'ADD_TODO') return state.concat([action.todo])


  return state;
}

function createStore(reducer) {
//the store has 4 parts
// 1. the state
// 2. get the state
// 3. listen for changes on state
// 4. update the state

  let state;
  let listners = [];

  const getState = () => state

  const subscribe = (listner) => {
    listners.push(listner)
    return () => {
      listners = listners.filter((l) => l !== listner)
    }
  }

  const dispatch = (action) => {
    // call todos function
    state = reducer(state, action)
    
    // loop over listners and invoke them
    listners.forEach((listner) => listner())
  }

  return {
    getState,
    subscribe,
    dispatch
  }
}

const store = createStore(todos)
