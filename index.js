// library code
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

// app code
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

// reducer functions
function todos (state = [], action) {
  switch (action.type) {
    case ADD_TODO :
     return state.concat([action.todo])
    case REMOVE_TODO : 
      return state.filter((todo) => todo.id !== action.id)
    case TOGGLE_TODO : 
      return state.map((todo) => todo.id !== action.id ? todo : 
        Object.assign({}, todo, {complete: !todo.complete})
      )
    default : 
      return state
  }
}

function goals (state = [], action) {
  switch(action.type) {
    case ADD_GOAL :
      return state.concat([action.goal])
    case REMOVE_GOAL :
      return state.filter((goal) => goal.id !== action.id)
    
    default :
      return state
  }
}

function app (state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action)
  }
}

const store = createStore(app)

store.subscribe(() => {
  console.log('The new state is: ', store.getState())
})

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 0,
    name: 'Walk the dog',
    complete: false,
  }
})

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 1,
    name: 'Wash the car',
    complete: false,
  }
})

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 2,
    name: 'Go to the gym',
    complete: true,
  }
})

store.dispatch({
  type: REMOVE_TODO,
  id: 1
})

store.dispatch({
  type: TOGGLE_TODO,
  id: 0
})

store.dispatch({
  type: ADD_GOAL,
  goal: {
    id: 0,
    name: 'Learn Redux'
  }
})

store.dispatch({
  type: ADD_GOAL,
  goal: {
    id: 1,
    name: 'Lose 20 pounds'
  }
})

store.dispatch({
  type: REMOVE_GOAL,
  id: 0
}) 
