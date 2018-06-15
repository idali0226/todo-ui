import * as actionTypes from '../constants/actionTypes'
import initialState from './initialState'

function users(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CREATE_USER_REQUEST:
      return Object.assign({}, state, {
        isSubmiting: true,
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
        isSubmiting: false,
        currentUserFilter: action.payload.name,
      })
    case actionTypes.FETCH_USERS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case actionTypes.FETCH_USERS_SUCCESS:
      return Object.assign({}, state, {
        users: action.payload,
        isFetching: false,
      })
    case actionTypes.FETCH_USERS_FAILURE:
      return {
        isFetching: false,
      }
    case actionTypes.TOGGLE_USER_FORM_OPEN:
      return Object.assign({}, state, {
        registerFormOpen: action.registerFormOpen,
        user: action.user,
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
