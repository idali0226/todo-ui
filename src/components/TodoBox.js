import React from 'react'
import 'bootstrap-css'
import 'react-dropdown/style.css'
import CreateTodo from './CreateTodo'
import TodoList from './TodoList'
import Filter from './Filter'
import '../app.css'

const API = 'http://localhost:3000/todos'
const UserAPI = 'http://localhost:3000/users'

export default class TodoBox extends React.Component {
  constructor() {
    super()
    this.state = {
      todos: [],
      users: [],
      currentFilter: 'All',
      currentUserFilter: 'All',
      hasError: false,
      userFilterOptions: [],
      statusFilterOptions: ['All', 'New', 'Done'],
    }

    this.handleDelete = this.handleDelete.bind(this)
    this.createTodo = this.createTodo.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleFilterUpdate = this.handleFilterUpdate.bind(this)
    this.handleUserFilterUpdate = this.handleUserFilterUpdate.bind(this)
    this.handleStatusChange = this.handleStatusChange.bind(this)
  }

  componentDidMount() {
    this.fetchTodos()
    this.fetchUsers()
  }

  handleUpdate({ id, name, description, status }) {
    const editedTodo = {
      id,
      name,
      description,
      status,
    }

    const options = {
      method: 'PUT',
      body: JSON.stringify(editedTodo),
      headers: {
        'Content-Type': 'application/json',
      },
    }

    fetch(`${API}/${id}`, options)
      .then(response => response.json())
      .then(() => {
        this.fetchTodos()
      })
  }

  handleStatusChange(id, status) {
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

    fetch(`${API}/${id}`, options)
      .then(response => response.json())
      .then(() => {
        this.fetchTodos()
      })
  }

  handleDelete(id) {
    const options = {
      method: 'DELETE',
    }

    fetch(`${API}/${id}`, options).then(() => {
      this.fetchTodos()
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

  handleFilterUpdate({ value }) {
    const userName = this.state.currentUserFilter
    const userId = this.state.users
      .filter(user => user.name === userName)
      .map(user => {
        return user.id
      })

    this.setState({
      currentFilter: value,
    })

    this.fetchTodos(value, userId)
  }

  handleUserFilterUpdate({ value }) {
    this.setState({
      currentUserFilter: value,
    })
    const currentFilter = this.state.currentFilter
    this.setTodosFromUserName(value, currentFilter)
  }

  getCurrentUserId() {
    const userName = this.state.currentUser
    if (userName !== 'All') {
      this.state.users.filter(user => user.name === userName).map(user => {
        return user.id
      })
    }
  }

  setTodosFromUserName(userName) {
    this.state.users
      .filter(user => user.name === userName)
      .map(user => user.todos)
      .map(todo => {
        this.setState({
          todos: todo,
        })
      })
  }

  createTodo({ name, description }) {
    const newTodo = {
      name,
      description,
      status: 'New',
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(newTodo),
      headers: {
        'Content-Type': 'application/json',
      },
    }

    fetch(API, options).then(res => {
      res.json()
      this.fetchTodos()
    })

    this.setState({
      currentFilter: 'All',
    })
  }

  fetchTodos() {
    let url = API

    const currentStatus = this.state.currentStatus
    const currentUserId = this.getCurrentUserId()
    console.log(currentUserId)
    let query
    if (currentStatus !== 'All' && currentUserId !== undefined) {
      console.log('id', currentUserId, currentStatus)
      query = `status=${currentStatus}&userId=${currentUserId}`
      url = `${API}/search?${query}`
    }

    console.log('url', url)
    fetch(url)
      .then(response => response.json())
      .then(data =>
        this.setState({
          todos: data,
        })
      )
  }

  fetchUsers() {
    fetch(`${UserAPI}`)
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
      currentFilter,
      currentUserFilter,
      statusFilterOptions,
    } = this.state

    let createTodoNode
    if (currentUserFilter !== 'All') {
      createTodoNode = <CreateTodo createTodo={this.createTodo} />
    }

    console.log(userFilterOptions)
    if (this.state.hasError) {
      return <div>Error, something went wrong</div>
    }
    return (
      <div className="row todo-container">
        <div className="cell">
          <h2>Todo App</h2>
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
              onFilterUpdate={this.handleFilterUpdate}
              currentFilter={currentFilter}
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
