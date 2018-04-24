import React from 'react'
import PropTypes from 'prop-types'
import RemoveConfirmation from './RemoveConfirmation'

const propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
}

class TodoView extends React.Component {
  constructor(props) {
    super(props)

    this.onDelete = this.onDelete.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.onStatusChange = this.onStatusChange.bind(this)
  }

  onStatusChange = e => {
    e.preventDefault()

    const newStatus = this.props.status === 'New' ? 'Done' : 'New'

    this.props.onStatusChange(this.props.id, newStatus)
  }

  onEdit = e => {
    e.preventDefault()
    this.props.onEdit()
  }

  onDelete() {
    this.props.onDelete(this.props.id)
  }

  render() {
    const { description, name, status } = this.props
    return (
      <div className="todo-list">
        <div className="todo-actions">
          <p className="todo-header">{name}</p>
          <p className="todo-body">{description}</p>
          <p className="todo-status">
            {status}
            {'   '}
            <a href="" onClick={this.onStatusChange}>
              Change status
            </a>
          </p>
          <div className="todo-actions">
            <RemoveConfirmation onDelete={this.onDelete} />
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
export default TodoView