import * as actionTypes from '../constants/actionTypes'

const initialState = {
  users: [],
  currentUserFilter: 'All',
  registerFormOpen: false,
  isFatching: false,
  isPersisting: false,
}

function users(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CREATE_USER_REQUEST:
      return Object.assign({}, state, {
        isPersisting: true,
      })
    case actionTypes.CREATE_USER_SUCCESS:
      return Object.assign({}, state, {
        users: [
          ...state.users,
          {
            id: action.payload.id,
            name: action.payload.name,
          },
        ],
        isPersisting: false,
        currentUserFilter: action.payload.name,
      })
    case actionTypes.FETCH_USERS_REQUEST:
      return Object.assign({}, state, {
        isFatching: true,
      })
    case actionTypes.FETCH_USERS_SUCCESS:
      return Object.assign({}, state, {
        users: action.payload,
        isFatching: false,
      })
    case actionTypes.TOGGLE_USER_FORM_OPEN:
      return Object.assign({}, state, {
        registerFormOpen: action.registerFormOpen,
      })
    case actionTypes.UPDATE_USER_FILTER:
      return Object.assign({}, state, {
        currentUserFilter: action.userName,
      })
    default:
      return state
  }
}
export default users
