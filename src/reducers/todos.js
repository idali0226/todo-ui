import * as actionTypes from '../constants/actionTypes'

const initialState = {
  todos: [],
  currentTodoFilter: 'All',
  showConfirm: false,
  isPersistingTodo: false,
  isEdit: false,
  error: {},
}

function todos(state = initialState, action) {
  switch (action.type) {
    case actionTypes.DELETE_TODO_SUCCESS:
      return Object.assign({}, state, {
        todos: [...state.todos.filter(todo => todo.id !== action.id)],
      })
    case actionTypes.CHANGE_TODO_STATUS_SUCCESS:
      return Object.assign({}, state, {
        todos: [
          ...state.todos.map(
            todo =>
              todo.id === action.payload.id
                ? { ...todo, status: action.payload.status }
                : todo
          ),
        ],
      })
    case actionTypes.UPDATE_TODO_SUCCESS:
      return Object.assign({}, state, {
        todos: [
          ...state.todos.map(
            todo =>
              todo.id === action.payload.id
                ? {
                    ...todo,
                    status: action.payload.status,
                    name: action.payload.name,
                    description: action.payload.description,
                  }
                : todo
          ),
        ],
      })
    case actionTypes.CREATE_TODO_REQUEST:
      return Object.assign({}, state, {
        isPersistingTodo: true,
      })
    case actionTypes.CREATE_TODO_SUCCESS:
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            id: action.payload.id,
            name: action.payload.name,
            description: action.payload.description,
            status: action.payload.status,
          },
        ],
        isPersistingTodo: false,
      })
    case actionTypes.CREATE_TODO_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
      })
    case actionTypes.FETCH_TODOS_SUCCESS:
      return Object.assign({}, state, {
        todos: action.payload,
      })
    case actionTypes.FETCH_TODOS_BY_USERID_SUCCESS:
      return Object.assign({}, state, {
        todos: action.payload,
      })
    case actionTypes.UPDATE_STATUS_FILTER:
      return Object.assign({}, state, {
        currentTodoFilter: action.status,
      })
    case actionTypes.RESET_TODOS:
      return Object.assign({}, state, {
        todos: action.todos,
      })
    default:
      return state
  }
}
export default todos
