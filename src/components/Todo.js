import React from 'react'
import PropTypes from 'prop-types'
import RemoveConfirmation from './RemoveConfirmation'
import EditTodo from './EditTodo'

const propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
}

class Todo extends React.Component {
  constructor() {
    super()

    this.handlerDelete = this.handlerDelete.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.updateTodo = this.updateTodo.bind(this)
    this.changeStatus = this.changeStatus.bind(this)

    this.state = {
      isEdit: false,
    }
  }

  changeStatus(event) {
    event.preventDefault()

    const newStatus = this.props.status === 'New' ? 'Done' : 'New'

    this.props.changeStatus(this.props.id, newStatus)

    this.setState({
      isEdit: false,
    })
  }

  updateTodo(id, name, description, status) {
    this.props.updateTodo(id, name, description, status)
    this.setState({
      isEdit: false,
    })
  }

  handleEdit(event) {
    event.preventDefault()
    this.setState({
      isEdit: !this.state.isEdit,
    })
  }

  handlerDelete() {
    this.props.onDelete(this)
  }

  render() {
    if (this.state.isEdit) {
      return (
        <EditTodo
          id={this.props.id}
          name={this.props.name}
          description={this.props.description}
          status={this.props.status}
          editTodo={this.updateTodo}
        />
      )
    }
    return (
      <div className="todo-list">
        <div className="todo-actions">
          <p className="todo-header">{this.props.name}</p>
          <p className="todo-body">{this.props.description}</p>
          <p className="todo-status">
            {this.props.status}
            {'   '}
            <a href="" onClick={this.changeStatus}>
              Change status
            </a>
          </p>
          <div className="todo-actions">
            <RemoveConfirmation onDelete={this.handlerDelete} />
            <a href="" onClick={this.handleEdit}>
              Edit
            </a>
          </div>
        </div>
      </div>
    )
  }
}

Todo.propTypes = propTypes
export default Todo
