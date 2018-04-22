import React from 'react'
import PropTypes from 'prop-types'
import TodoForm from './TodosForm'

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
    const { state } = this
    return (
      <div>
        <TodoForm
          addTodo={this.addTodo}
          isEdit={state.isEdit}
          id={state.id}
          name={state.name}
          description={state.description}
          status={state.status}
        />
      </div>
    )
  }
}
CreateTodo.propTypes = propTypes

export default CreateTodo
