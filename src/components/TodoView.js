import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { deleteTodo, changeTodoStatus, toggleTodoFormOpen } from '../actions'
import RemoveConfirmation from './RemoveConfirmation'

const propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  status: PropTypes.string,
  deleteTodo: PropTypes.func.isRequired,
  changeTodoStatus: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  toggleTodoFormOpen: PropTypes.func,
}

const defaultProps = {
  id: undefined,
  name: undefined,
  description: undefined,
  status: undefined,
  toggleTodoFormOpen: undefined,
}

const mapDispatchToProps = {
  deleteTodo,
  changeTodoStatus,
  toggleTodoFormOpen,
}

class TodoView extends React.Component {
  constructor() {
    super()

    this.onEdit = this.onEdit.bind(this)
    this.handleStatusChange = this.handleStatusChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  onEdit = e => {
    e.preventDefault()

    const { id, description, name, status } = this.props
    console.log(id, name, description, status)
    this.props.toggleTodoFormOpen(true, id, name, description, status)
    this.props.onEdit()
  }

  handleDelete = () => {
    this.props.deleteTodo(this.props.id)
  }

  handleStatusChange = e => {
    e.preventDefault()

    const newStatus = this.props.status === 'New' ? 'Done' : 'New'
    this.props.changeTodoStatus(this.props.id, newStatus)
  }

  render() {
    const { description, name, status } = this.props
    return (
      <div className="todo-list">
        <div className="todo-actions">
          <p className="todo-header">{name}</p>
          {description && <p className="todo-body">{description}</p>}
          <p className="todo-status">
            {status}
            {'   '}
            <a href="" onClick={this.handleStatusChange}>
              Change status
            </a>
          </p>
          <div className="todo-actions">
            <RemoveConfirmation onDelete={this.handleDelete} />
            <a href="" onClick={this.onEdit}>
              Edit
            </a>
          </div>
        </div>
      </div>
    )
  }
}

TodoView.propTypes = propTypes
TodoView.defaultProps = defaultProps
export default connect(undefined, mapDispatchToProps)(TodoView)
