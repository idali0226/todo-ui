import React from 'react'
import 'bootstrap-css'
import 'react-dropdown/style.css'
import CreateTodo from './CreateTodo'
import CreateUser from './CreateUser'
import TodoList from './TodoList'
import Filter from './Filter'
import '../app.css'

const API = 'http://localhost:3000'

const buildQuery = queryParms => {
  return Object.keys(queryParms).reduce((query, key) => {
    if (queryParms[key] !== 'All' && queryParms[key] !== undefined) {
      const value = `${key}=${queryParms[key]}`
      if (query) {
        return `${query}&${value}`
      }
      return value
    }
    return query
  }, '')
}

export default class TodoBox extends React.Component {
  constructor() {
    super()
    this.state = {
      todos: [],
      users: [],
      currentStatusFilter: 'All',
      currentUserFilter: 'All',
      hasError: false,
      userFilterOptions: [],
      statusFilterOptions: ['All', 'New', 'Done'],
    }

    this.createTodo = this.createTodo.bind(this)
    this.createUser = this.createUser.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleStatusChange = this.handleStatusChange.bind(this)
    this.handleStatusFilterUpdate = this.handleStatusFilterUpdate.bind(this)
    this.handleUserFilterUpdate = this.handleUserFilterUpdate.bind(this)
  }

  componentDidMount() {
    this.fetchTodos()
    this.fetchUsers()
  }

  getCurrentUserId(value) {
    const user = this.state.users.find(u => {
      return u.name === value
    })
    return user ? user.id : undefined
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

  handleDelete(id) {
    const { currentUserFilter, currentStatusFilter } = this.state
    const userId = this.getCurrentUserId(currentUserFilter)

    const options = {
      method: 'DELETE',
    }

    fetch(`${API}/todos/${id}`, options).then(() => {
      this.fetchTodos(currentStatusFilter, userId)
    })
  }

  handleStatusChange(id, status) {
    const { currentUserFilter, currentStatusFilter } = this.state
    const userId = this.getCurrentUserId(currentUserFilter)

    const editedTodo = {
      id,
      status,
    }

    const options = {
      method: 'PATCH',
      body: JSON.stringify(editedTodo),
      headers: {
        'Content-Type': 'application/json',
      },
    }

    fetch(`${API}/todos/${id}`, options)
      .then(response => response.json())
      .then(() => {
        this.fetchTodos(currentStatusFilter, userId)
      })
  }

  handleUpdate({ id, name, description, capitalizedStatus }) {
    const { currentUserFilter, currentStatusFilter } = this.state
    const userId = this.getCurrentUserId(currentUserFilter)

    const editedTodo = {
      id,
      name,
      description,
      status: capitalizedStatus,
    }
    const options = {
      method: 'PUT',
      body: JSON.stringify(editedTodo),
      headers: {
        'Content-Type': 'application/json',
      },
    }

    fetch(`${API}/todos/${id}`, options)
      .then(response => response.json())
      .then(() => {
        this.fetchTodos(currentStatusFilter, userId)
      })
  }

  handleStatusFilterUpdate({ value }) {
    const userId = this.getCurrentUserId(this.state.currentUserFilter)

    this.setState({
      currentStatusFilter: value,
    })
    this.fetchTodos(value, userId)
  }

  handleUserFilterUpdate({ value }) {
    const currentFilter = this.state.currentStatusFilter
    this.setState({
      currentUserFilter: value,
    })

    const userId = this.getCurrentUserId(value)
    this.fetchTodos(currentFilter, userId)
  }

  createTodo({ name, description }) {
    //  const userId = this.getCurrentUserId(this.state.currentUserFilter)[0]
    const userId = this.getCurrentUserId(this.state.currentUserFilter)
    const url = `${API}/todos`

    const newTodo = {
      name,
      description,
      status: 'New',
      userId,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(newTodo),
      headers: {
        'Content-Type': 'application/json',
      },
    }

    fetch(url, options).then(res => {
      res.json()
      this.fetchTodos('New', userId)
    })

    this.setState({
      currentStatusFilter: 'New',
    })
  }

  createUser({ capitalizedStatus }) {
    const url = `${API}/users`
    const newUser = {
      name: capitalizedStatus,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json',
      },
    }

    fetch(url, options)
      .then(res => res.json())
      .then(() => {
        this.fetchUsers()
      })

    this.setState({
      todos: [],
      currentStatusFilter: 'All',
      currentUserFilter: capitalizedStatus,
    })
  }

  fetchTodos(status, userId) {
    const queryParms = {
      status,
      userId,
    }

    const query = buildQuery(queryParms)
    let url = `${API}/todos`
    if (query) {
      url = `${API}/todos/search?${query}`
    }
    fetch(url)
      .then(response => response.json())
      .then(data =>
        this.setState({
          todos: data,
        })
      )
  }

  fetchUsers() {
    fetch(`${API}/users`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          userFilterOptions: ['All'].concat(data.map(value => value.name)),
          users: data,
        })
      )
  }

  componentDidCatch() {
    this.setState({ hasError: true })
  }

  render() {
    const {
      todos,
      userFilterOptions,
      currentStatusFilter,
      currentUserFilter,
      statusFilterOptions,
    } = this.state

    let createTodoNode
    if (currentUserFilter !== 'All') {
      createTodoNode = <CreateTodo createTodo={this.createTodo} />
    }

    if (this.state.hasError) {
      return <div>Error, something went wrong</div>
    }
    return (
      <div className="row todo-container">
        <div className="cell">
          <h2>Todo App</h2>
          <CreateUser createUser={this.createUser} />
          <h4>Users</h4>
          <Filter
            users={userFilterOptions}
            onFilterUpdate={this.handleUserFilterUpdate}
            currentFilter={currentUserFilter}
            options={userFilterOptions}
          />

          <div className="todo">
            {createTodoNode}
            <hr />
            <h3 className="todo-count">TODO List [{todos.length}]</h3>
            <Filter
              onFilterUpdate={this.handleStatusFilterUpdate}
              currentFilter={currentStatusFilter}
              options={statusFilterOptions}
            />

            <TodoList
              todos={todos}
              onUpdate={this.handleUpdate}
              onStatusChange={this.handleStatusChange}
              onDelete={this.handleDelete}
            />
          </div>
        </div>
      </div>
    )
  }
}
