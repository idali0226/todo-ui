import React from 'react'
import 'bootstrap-css'
import 'react-dropdown/style.css'
import CreateTodo from './CreateTodo'
import TodoList from './TodoList'
import Filter from './Filter'
import '../app.css'

const API = 'http://localhost:3000/todos'

export default class TodoBox extends React.Component {
  constructor() {
    super()
    this.state = {
      todos: [],
      currentFilter: 'All',
      hasError: false,
    }

    this.handleDelete = this.handleDelete.bind(this)
    this.createTodo = this.createTodo.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleFilterUpdate = this.handleFilterUpdate.bind(this)
    this.handleStatusChange = this.handleStatusChange.bind(this)
  }

  componentDidMount() {
    this.fetchTodos()
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
    this.fetchTodos(value)

    this.setState({
      currentFilter: value,
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

  fetchTodos(value) {
    let url = API
    if (value !== undefined && value !== 'All') {
      url = `${API}/search?status=${value}`
    }

    fetch(url)
      .then(response => response.json())
      .then(data =>
        this.setState({
          todos: data,
        })
      )
  }

  componentDidCatch() {
    this.setState({ hasError: true })
  }

  render() {
    const { todos, currentFilter } = this.state

    if (this.state.hasError) {
      return <div>Error, something went wrong</div>
    }
    return (
      <div className="row todo-container">
        <div className="cell">
          <h2>Todo App</h2>
          <div className="todo">
            <CreateTodo createTodo={this.createTodo} />
            <hr />
            <h3 className="todo-count">TODO List [{todos.length}]</h3>
            <Filter
              onFilterUpdate={this.handleFilterUpdate}
              currentFilter={currentFilter}
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
