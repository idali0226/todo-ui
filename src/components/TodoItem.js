import React from 'react'
import PropTypes from 'prop-types'
import TodoView from './TodoView'
import EditTodo from './EditTodo'

const propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  status: PropTypes.string,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
  onStatusChange: PropTypes.func,
}

const defaultProps = {
  id: undefined,
  name: '',
  description: '',
  status: '',
  onDelete: undefined,
  onUpdate: undefined,
  onStatusChange: undefined,
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

  onUpdate({ id, name, description, status }) {
    this.props.onUpdate({ id, name, description, status })
    this.setState({
      isEdit: false,
    })
  }

  onEdit() {
    this.setState({
      isEdit: !this.state.isEdit,
    })
  }

  onDelete() {
    this.props.onDelete(this.props.id)
  }

  onStatusChange(id, newStatus) {
    this.props.onStatusChange(id, newStatus)

    this.setState({
      isEdit: false,
    })
  }

  render() {
    const { id, name, description, status } = this.props
    if (this.state.isEdit) {
      return (
        <EditTodo
          id={id}
          name={name}
          description={description}
          status={status}
          onEdit={this.onUpdate}
        />
      )
    }
    return (
      <TodoView
        id={id}
        name={name}
        description={description}
        status={status}
        onDelete={this.onDelete}
        onEdit={this.onEdit}
        onStatusChange={this.onStatusChange}
      />
    )
  }
}

TodoItem.propTypes = propTypes
TodoItem.defaultProps = defaultProps

export default TodoItem
