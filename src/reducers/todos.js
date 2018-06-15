import * as actionTypes from '../constants/actionTypes'
import initialState from './initialState'

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
        isSubmiting: true,
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
        isSubmiting: false,
        todo: {},
      })
    case actionTypes.CREATE_TODO_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        isSubmiting: false,
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
    case actionTypes.TOGGLE_TODO_FORM_OPEN:
      return Object.assign({}, state, {
        todo: {
          id: action.id,
          name: action.name,
          description: action.description,
          status: action.status,
        },
        isEdit: action.isEdit,
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
