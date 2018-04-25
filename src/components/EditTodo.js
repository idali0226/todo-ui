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
  render() {
    const { id, name, description, status } = this.props
    return (
      <div>
        <TodoForm
          id={id}
          name={name}
          description={description}
          status={status}
          onUpdate={this.props.onEdit}
          isEdit
        />
      </div>
    )
  }
}
EditTodo.propTypes = propTypes

export default EditTodo
