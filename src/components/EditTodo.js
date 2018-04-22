import React from 'react'
import PropTypes from 'prop-types'
import TodoForm from './TodosForm'

const propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  editTodo: PropTypes.func.isRequired,
}

class EditTodo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.id,
      name: this.props.name,
      description: this.props.description,
      status: 'New',
      isEdit: true,
    }
    this.updateTodo = this.updateTodo.bind(this)
  }

  updateTodo(id, name, description, status) {
    this.props.editTodo(id, name, description, status)
  }

  render() {
    const { state } = this
    return (
      <div>
        <TodoForm
          id={state.id}
          name={state.name}
          description={state.description}
          status={state.status}
          editTodo={this.updateTodo}
          isEdit={state.isEdit}
        />
      </div>
    )
  }
}
EditTodo.propTypes = propTypes

export default EditTodo
