import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import UserForm from './UserForm'
import { toggleFormOpen, createUser, resetTodos } from '../actions'

const propTypes = {
  toggleFormOpen: PropTypes.func,
  createUser: PropTypes.func,
  resetTodos: PropTypes.func,
  registerFormOpen: PropTypes.bool,
}

const defaultProps = {
  toggleFormOpen: undefined,
  createUser: undefined,
  resetTodos: undefined,
  registerFormOpen: false,
}

const mapStateToProps = state => {
  return {
    registerFormOpen: state.users.registerFormOpen,
  }
}

const mapDispatchToProps = {
  toggleFormOpen,
  createUser,
  resetTodos,
}

class CreateUser extends React.Component {
  constructor() {
    super()

    this.handleToggleUserForm = this.handleToggleUserForm.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  toggleFormOpen = () => {
    this.props.toggleFormOpen(!this.props.registerFormOpen)
  }

  handleToggleUserForm = e => {
    e.preventDefault()
    this.toggleFormOpen(!this.props.registerFormOpen)
  }

  handleCancel = () => {
    this.toggleFormOpen()
  }

  handleSubmit = ({ name }) => {
    this.props.createUser(name)
    this.props.resetTodos()
    this.props.toggleFormOpen()
  }

  render() {
    if (this.props.registerFormOpen) {
      return (
        <UserForm onCancel={this.handleCancel} onSubmit={this.handleSubmit} />
      )
    }

    return (
      <a href="" onClick={this.handleToggleUserForm}>
        <h3>Register new user</h3>
      </a>
    )
  }
}

CreateUser.propTypes = propTypes
CreateUser.defaultProps = defaultProps
export default connect(mapStateToProps, mapDispatchToProps)(CreateUser)
