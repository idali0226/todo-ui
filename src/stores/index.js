import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import todoApp from '../reducers/index'

const store = createStore(todoApp, applyMiddleware(logger, thunk))

export default store
