import React from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'

const propTypes = {
  todos: PropTypes.array.isRequired,
  onStatusChange: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  onChange: PropTypes.func,
}

const defaultProps = {
  onStatusChange: undefined,
  onUpdate: undefined,
  onDelete: undefined,
  onChange: undefined,
}

class TodoList extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.todos !== prevState.todos) {
      return {
        todos: nextProps.todos,
      }
    }

    // No state update necessary
    return null
  }

  constructor(props) {
    super(props)
    this.state = {
      todos: this.props.todos,
    }

    this.onStatusChange = this.onStatusChange.bind(this)
    this.onUpdate = this.onUpdate.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }

  onDelete(id) {
    this.props.onDelete(id)
  }

  onUpdate(id, name, description, capitalrizedStatus) {
    console.log(id, name, description, capitalrizedStatus)
    this.props.onUpdate(id, name, description, capitalrizedStatus)
  }

  onStatusChange(id, newStatus) {
    this.props.onStatusChange(id, newStatus)
  }

  render() {
    return this.state.todos.map(todoItem => {
      return (
        <TodoItem
          {...todoItem}
          key={todoItem.id}
          onDelete={this.onDelete}
          onUpdate={this.onUpdate}
          onStatusChange={this.onStatusChange}
        />
      )
    })
  }
}

TodoList.propTypes = propTypes
TodoList.defaultProps = defaultProps

export default TodoList
