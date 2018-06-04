import { combineReducers } from 'redux'
import users from './users'
import todos from './todos'

const todoApp = combineReducers({
  users,
  todos,
})

export default todoApp
