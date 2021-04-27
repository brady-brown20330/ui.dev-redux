// reduces state and action to new state
function todos (state = [], action) {
  switch (action.type) {
    case 'ADD_TODO' :
     return state.concat([action.todo])
    case 'REMOVE_TODO' :  
      return state.filter((todo) => todo.id !== action.id)
    case 'TOGGLE_TODO' : 
      return state.map((todo) => todo.id !== action.id ? todo : 
        Object.assign({}, todo, {complete: !todo.complete})
      )
    default : 
      return state
  }
}

function goals (state = [], action) {
  switch(action.type) {
    case 'ADD_GOAL' :
      return state.concat([action.goal])
    case 'REMOVE_GOAL' :
      return state.filter((goal) => goal.id !== action.id)
    
    default :
      return state
  }
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
    // call reducer function
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
