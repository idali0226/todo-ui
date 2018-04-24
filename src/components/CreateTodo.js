import React from 'react'
import PropTypes from 'prop-types'
import TodoForm from './TodoForm'

const propTypes = {
  createTodo: PropTypes.func.isRequired,
}

class CreateTodo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isEdit: false,
      id: 0,
      name: '',
      description: '',
      status: '',
    }

    this.addTodo = this.addTodo.bind(this)
  }

  addTodo(name, description) {
    this.props.createTodo(name, description)
  }

  render() {
    const { id, name, description, status, isEdit } = this.state
    return (
      <div>
        <TodoForm
          addTodo={this.addTodo}
          isEdit={isEdit}
          id={id}
          name={name}
          description={description}
          status={status}
        />
      </div>
    )
  }
}
CreateTodo.propTypes = propTypes

export default CreateTodo
