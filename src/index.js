import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './stores/index'
import TodoBox from './components/TodoBox'

ReactDOM.render(
  <Provider store={store}>
    <TodoBox />
  </Provider>,
  document.getElementById('root')
)
