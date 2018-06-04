import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'

const propTypes = {
  todos: PropTypes.array.isRequired,
}

const mapStateToProps = state => {
  return {
    todos: state.todos.todos,
  }
}

class TodoList extends React.Component {
  render() {
    return this.props.todos.map(todoItem => {
      return <TodoItem {...todoItem} key={todoItem.id} />
    })
  }
}
TodoList.propTypes = propTypes
export default connect(mapStateToProps, undefined)(TodoList)
