import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
// import initialState from './initialState'
import users from './users'
import todos from './todos'
import * as actionTypes from '../constants/actionTypes'

const todoApp = combineReducers({
  users,
  todos,
  form: formReducer.plugin({
    todoForm: (state, action) => {
      switch (action.type) {
        case actionTypes.CREATE_TODO_SUCCESS:
          return {
            ...state,
            values: {
              ...state.values,
              name: undefined,
              description: undefined,
            },
            fields: {
              ...state.fields,
              name: undefined,
              description: undefined,
            },
          }
        default:
          return state
      }
    },
  }),
})

export default todoApp
