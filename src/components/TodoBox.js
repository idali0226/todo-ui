import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import 'bootstrap-css'
import 'react-dropdown/style.css'
import CreateTodo from './CreateTodo'
import CreateUser from './CreateUser'
import TodoList from './TodoList'
import StatusFilter from './StatusFilter'
import UserFilter from './UserFilter'
import { fetchUsers, fetchTodos } from '../actions'
import '../app.css'

const propTypes = {
  fetchTodos: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  todos: PropTypes.array.isRequired,
  currentUserFilter: PropTypes.string.isRequired,
  isFetchingUsers: PropTypes.bool,
  isFetchingTodos: PropTypes.bool,
  error: PropTypes.string,
}

const defaultProps = {
  isFetchingUsers: undefined,
  isFetchingTodos: undefined,
  error: undefined,
}

const mapStateToProps = state => {
  return {
    currentUserFilter: state.users.currentUserFilter,
    todos: state.todos.todos,
    isFetchingUsers: state.users.isFetching,
    isFetchingTodos: state.todos.isFetching,
    error: state.todos.error.error,
  }
}

const mapDispatchToProps = {
  fetchUsers,
  fetchTodos,
}

class TodoBox extends React.Component {
  componentDidMount() {
    this.props.fetchTodos()
    this.props.fetchUsers()
  }

  getTodoTitle(todosCount) {
    if (todosCount === 0) {
      this.title = 'No todo items yet'
    } else if (todosCount === 1) {
      this.title = '1 todo item'
    } else {
      this.title = `${todosCount} todo items`
    }
    return this.title
  }

  render() {
    const {
      todos,
      currentUserFilter,
      isFetchingUsers,
      isFetchingTodos,
      error,
    } = this.props

    const isFetching = isFetchingTodos || isFetchingUsers
    let createTodoNode
    if (currentUserFilter !== 'All') {
      createTodoNode = <CreateTodo />
    }

    if (error) {
      return <div>Error, something went wrong</div>
    }

    if (isFetching) {
      return (
        <div>
          <p>loading.....</p>
        </div>
      )
    }

    const numberOfTodos = todos.length
    return (
      <div className="row todo-container">
        <div className="cell">
          <h2>Todo App</h2>
          <CreateUser />
          <h4>Users</h4>
          <UserFilter />
          <div className="todo">
            {createTodoNode}
            <hr />
            <h3 className="todo-count">TODO List [{numberOfTodos}]</h3>
            <StatusFilter />
            <TodoList />
          </div>
        </div>
      </div>
    )
  }
}
TodoBox.propTypes = propTypes
TodoBox.defaultProps = defaultProps
export default connect(mapStateToProps, mapDispatchToProps)(TodoBox)
