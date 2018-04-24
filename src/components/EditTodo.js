import React from 'react'
import PropTypes from 'prop-types'
import TodoForm from './TodoForm'

const propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
}

class EditTodo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.id,
      name: this.props.name,
      description: this.props.description,
      status: this.props.status,
      isEdit: true,
    }
    this.onUpdate = this.onUpdate.bind(this)
  }

  onUpdate(id, name, description, status) {
    this.props.onEdit(id, name, description, status)
  }

  render() {
    const { id, name, description, status, isEdit } = this.state
    return (
      <div>
        <TodoForm
          id={id}
          name={name}
          description={description}
          status={status}
          onUpdate={this.onUpdate}
          isEdit={isEdit}
        />
      </div>
    )
  }
}
EditTodo.propTypes = propTypes

export default EditTodo
