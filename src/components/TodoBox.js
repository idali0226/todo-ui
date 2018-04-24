import React from 'react'
import 'bootstrap-css'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import CreateTodo from './CreateTodo'
import TodoList from './TodoList'
import '../app.css'

const API = 'http://localhost:3000/todos'

export default class TodoBox extends React.Component {
  constructor() {
    super()
    this.state = {
      todos: [],
      selectDefaultValue: 0,
      hasError: false,
    }

    this.onDelete = this.onDelete.bind(this)
    this.createTodo = this.createTodo.bind(this)
    this.onUpdate = this.onUpdate.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.onStatusChange = this.onStatusChange.bind(this)
  }

  componentDidMount() {
    this.fetchTodos()
  }

  onSelect(value) {
    let index = 0
    if (value.value === 'New') {
      index = 1
    } else if (value.value === 'Done') {
      index = 2
    }
    this.setState({
      selectDefaultValue: index,
    })
    this.fetchTodos(value.value)
  }

  onUpdate(id, name, description, status) {
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

  onStatusChange(id, status) {
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

  onDelete(id) {
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

  createTodo(name, description) {
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
      selectDefaultValue: 0,
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
    const { state } = this

    const options = ['All', 'New', 'Done']
    const defaultOption = options[this.state.selectDefaultValue]

    if (this.state.hasError) {
      return <div>Error, something went wrong</div>
    }

    //   if (this.state.todos.length > 0) {
    return (
      <div className="row todo-container">
        <div className="cell">
          <h2>Todo App</h2>
          <div className="todo">
            <CreateTodo createTodo={this.createTodo} />
            <hr />
            <h3 className="todo-count">TODO List [{state.todos.length}]</h3>
            <Dropdown
              options={options}
              onChange={this.onSelect}
              value={defaultOption}
              placeholder="Select an option"
            />
            <div>
              <TodoList
                todos={state.todos}
                onUpdate={this.onUpdate}
                onStatusChange={this.onStatusChange}
                onDelete={this.onDelete}
              />
            </div>
          </div>
        </div>
      </div>
    )
    //    }
    //   return <div>Please wait...</div>
  }
}
