import React from 'react'
import PropTypes from 'prop-types'
import RemoveConfirmation from './RemoveConfirmation'

const propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  status: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
}

const defaultProps = {
  id: undefined,
  name: undefined,
  description: undefined,
  status: undefined,
}

class TodoView extends React.Component {
  constructor(props) {
    super(props)

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
            <a href="" onClick={this.onStatusChange}>
              Change status
            </a>
          </p>
          <div className="todo-actions">
            <RemoveConfirmation onDelete={this.props.onDelete} />
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

export default TodoView
