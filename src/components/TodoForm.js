import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  addTodo: PropTypes.func.isRequired,
}

class TodoForm extends React.Component {
  constructor() {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()

    this.props.addTodo(this.name.value, this.description.value)

    this.name.value = ''
    this.description.value = ''
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="todo-form">
          <label htmlFor="todoInput">New todo</label>
          <div className="todo-form-fields" id="todoInput">
            <input
              id="name"
              placeholder="Name"
              ref={input => {
                this.name = input
              }}
            />
            <textarea
              id="description"
              placeholder="Description"
              ref={textarea => {
                this.description = textarea
              }}
            />
          </div>
          <div className="todo-form-actions">
            <button type="submit">Create todo item</button>
          </div>
        </form>
      </div>
    )
  }
}

TodoForm.propTypes = propTypes

export default TodoForm
