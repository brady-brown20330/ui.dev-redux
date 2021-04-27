let addTodo = {
  'type': 'ADD_TODO',
  'todo': {
    'id': 0,
    'name': 'Learn Redux',
    'complete': false
  }
}

let removeTodo = {
  'type': 'REMOVE_TODO',
  'id': 0
}

let toggleTodo = {
  'type': 'TOGGLE_TODO',
  'id': 0
}

function createStore() {
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

  return {
    getState,
    subscribe
  }
}
