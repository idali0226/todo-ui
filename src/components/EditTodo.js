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

class EditTodo extends React.Component {
  constructor(props) {
    super(props)
    this.handleEditTodo = this.handleEditTodo.bind(this)
  }

  handleEditTodo = (id, name, description, status) => {
    const capitalizedStatus =
      status.slice(0, 1).toUpperCase() + status.slice(1, status.length)

    this.props.updateTodo(id, name, description, capitalizedStatus)
    this.props.onCloseEditForm()
  }

  render() {
    const { ...todo } = this.props
    return (
      <div>
        <TodoForm {...todo} onUpdate={this.handleEditTodo} isEdit />
      </div>
    )
  }
}
EditTodo.propTypes = propTypes
EditTodo.defaultProps = defaultProps
export default connect(undefined, mapDispatchToProps)(EditTodo)
