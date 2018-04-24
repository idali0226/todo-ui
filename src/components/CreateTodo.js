import React from 'react'
import PropTypes from 'prop-types'
import TodoForm from './TodoForm'

const propTypes = {
  createTodo: PropTypes.func.isRequired,
}

class CreateTodo extends React.Component {
  createTodo(name, description) {
    this.props.createTodo(name, description)
  }

  render() {
    return (
      <div>
        <TodoForm
          createTodo={this.props.createTodo}
          isEdit={false}
          id={0}
          name=""
          description=""
          status=""
        />
      </div>
    )
  }
}
CreateTodo.propTypes = propTypes

export default CreateTodo
