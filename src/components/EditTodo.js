import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TodoForm from './TodoForm'
import { updateTodo } from '../actions'

const propTypes = {
  updateTodo: PropTypes.func,
  onCloseEditForm: PropTypes.func,
}

const defaultProps = {
  updateTodo: undefined,
  onCloseEditForm: undefined,
}

const mapDispatchToProps = {
  updateTodo,
}

const mapStateToProps = state => {
  return {
    todo: state.todos.todo,
  }
}

class EditTodo extends React.Component {
  constructor(props) {
    super(props)
    this.handleEditTodo = this.handleEditTodo.bind(this)
  }

  handleEditTodo = ({ id, name, description, status }) => {
    this.props.updateTodo(id, name, description, status)
    this.props.onCloseEditForm()
  }

  render() {
    const { ...todo } = this.props
    const initialValues = {
      initialValues: todo,
    }

    return (
      <div>
        <TodoForm
          form={`todoForm-edit-${todo.id}`}
          {...initialValues}
          onSubmit={this.handleEditTodo}
          isEdit
        />
      </div>
    )
  }
}
EditTodo.propTypes = propTypes
EditTodo.defaultProps = defaultProps
export default connect(mapStateToProps, mapDispatchToProps)(EditTodo)
