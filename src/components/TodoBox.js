import React from 'react'
import 'bootstrap-css'
import 'react-dropdown/style.css'
import CreateTodo from './CreateTodo'
import CreateUser from './CreateUser'
import TodoList from './TodoList'
import Filter from './Filter'
import '../app.css'

const API = 'http://localhost:3000'

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

  handleUpdate({ id, name, description, capitalrizedStatus }) {
    const userId = this.getCurrentUserId(this.state.currentUserFilter)
    const currentStatus = this.state.currentStatusFilter
    const editedTodo = {
      id,
      name,
      description,
      status: capitalrizedStatus,
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
        this.fetchTodos(currentStatus, userId)
      })
  }

  handleStatusChange(id, status) {
    const { currentUserFilter, currentStatusFilter } = this.state
    const userId = this.getCurrentUserId(currentUserFilter)
    //  const userId = this.getCurrentUserId(this.state.currentUserFilter)
    //  const currentStatus = this.state.currentStatusFilter

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

  handleDelete(id) {
    const userId = this.getCurrentUserId(this.state.currentUserFilter)
    const currentStatus = this.state.currentStatusFilter

    const options = {
      method: 'DELETE',
    }

    fetch(`${API}/todos/${id}`, options).then(() => {
      this.fetchTodos(currentStatus, userId)
    })
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

  getCurrentUserId(value) {
    if (value !== 'All') {
      return this.state.users.filter(user => user.name === value).map(user => {
        return user.id
      })
    }
  }

  createTodo({ name, description }) {
    const userId = this.getCurrentUserId(this.state.currentUserFilter)[0]
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

  createUser({ capitalrizedName }) {
    const url = `${API}/users`
    const newUser = {
      name: capitalrizedName,
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
      .then(data => {
        this.fetchUsers()
      })

    this.setState({
      todos: [],
      currentStatusFilter: 'All',
      currentUserFilter: capitalrizedName,
    })
  }

  fetchTodos(status, usreId) {
    let url = `${API}/todos`
    let query
    if (status !== 'All' && status !== undefined) {
      query = `status=${status}`
      if (usreId !== undefined) {
        query = `${query}&userId=${usreId}`
      }
    } else {
      if (usreId !== undefined) {
        query = `userId=${usreId}`
      }
    }

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
            filterOptions={userFilterOptions}
          />

          <div className="todo">
            {createTodoNode}
            <hr />
            <h3 className="todo-count">TODO List [{todos.length}]</h3>
            <Filter
              onFilterUpdate={this.handleStatusFilterUpdate}
              currentFilter={currentStatusFilter}
              filterOptions={statusFilterOptions}
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
