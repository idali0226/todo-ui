import React from 'react'
import PropTypes from 'prop-types'
import TodoForm from './TodoForm'

const propTypes = {
  createTodo: PropTypes.func.isRequired,
}

class CreateTodo extends React.Component {
  render() {
    return (
      <div>
        <TodoForm createTodo={this.props.createTodo} isEdit={false} />
      </div>
    )
  }
}
CreateTodo.propTypes = propTypes
export default CreateTodo
