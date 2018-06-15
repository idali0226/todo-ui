import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from '../reducers'

const configureStore = initialState => {
  return createStore(rootReducer, initialState, applyMiddleware(logger, thunk))
}

export default configureStore
