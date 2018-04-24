import React from 'react'
import PropTypes from 'prop-types'
import TodoView from './TodoView'
import EditTodo from './EditTodo'

const propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
}

class TodoItem extends React.Component {
  constructor() {
    super()

    this.onDelete = this.onDelete.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.onUpdate = this.onUpdate.bind(this)
    this.onStatusChange = this.onStatusChange.bind(this)

    this.state = {
      isEdit: false,
    }
  }

  onUpdate(id, name, description, status) {
    this.props.onUpdate(id, name, description, status)
    this.setState({
      isEdit: false,
    })
  }

  onEdit() {
    this.setState({
      isEdit: !this.state.isEdit,
    })
  }

  onDelete(id) {
    this.props.onDelete(id)
  }

  onStatusChange(id, newStatus) {
    this.props.onStatusChange(id, newStatus)

    this.setState({
      isEdit: false,
    })
  }

  render() {
    if (this.state.isEdit) {
      return (
        <EditTodo
          id={this.props.id}
          name={this.props.name}
          description={this.props.description}
          status={this.props.status}
          onEdit={this.onUpdate}
        />
      )
    }
    return (
      <TodoView
        id={this.props.id}
        name={this.props.name}
        description={this.props.description}
        status={this.props.status}
        onDelete={this.onDelete}
        onEdit={this.onEdit}
        onStatusChange={this.onStatusChange}
      />
    )
  }
}

TodoItem.propTypes = propTypes

export default TodoItem
