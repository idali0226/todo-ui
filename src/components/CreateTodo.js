import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TodoForm from './TodoForm'
import { createTodo } from '../actions'
import { getCurrentUserId } from '../selectors'

const propTypes = {
  createTodo: PropTypes.func.isRequired,
  userId: PropTypes.number,
  error: PropTypes.string,
}

const defaultProps = {
  userId: undefined,
  error: undefined,
}

const mapStateToProps = state => {
  return {
    userId: getCurrentUserId(state),
    error: state.todos.error.error,
  }
}

const mapDispatchToProps = {
  createTodo,
}

class CreateTodo extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = ({ name, description }) => {
    this.props.createTodo(name, description, this.props.userId)
  }

  render() {
    let errorNode
    if (this.props.error) {
      errorNode = (
        <div className="error_text">
          <p>Create todo failed: {this.props.error}</p>
        </div>
      )
    }

    const initialValues = {
      initialValues: {},
    }

    return (
      <div>
        {errorNode}
        <TodoForm
          {...initialValues}
          isEdit={false}
          onSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}
CreateTodo.propTypes = propTypes
CreateTodo.defaultProps = defaultProps
export default connect(mapStateToProps, mapDispatchToProps)(CreateTodo)
