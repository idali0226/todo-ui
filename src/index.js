import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './stores/configureStore'
import TodoBox from './components/TodoBox'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <TodoBox />
  </Provider>,
  document.getElementById('root')
)
