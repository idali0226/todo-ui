import React from 'react'
import PropTypes from 'prop-types'
import UserForm from './UserForm'

const propTypes = {
  createUser: PropTypes.func.isRequired,
}

class CreateUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      registerFormOpen: false,
    }

    this.handleToggleUserForm = this.handleToggleUserForm.bind(this)
    this.onCreateUser = this.onCreateUser.bind(this)
  }

  onCreateUser(name) {
    this.toggleFormOpen()
    this.props.createUser(name)
  }

  toggleFormOpen() {
    this.setState({
      registerFormOpen: !this.state.registerFormOpen,
    })
  }

  handleToggleUserForm(event) {
    event.preventDefault()
    this.toggleFormOpen()
  }

  render() {
    if (this.state.registerFormOpen) {
      return (
        <UserForm
          createUser={this.onCreateUser}
          onCancel={this.handleToggleUserForm}
        />
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
export default CreateUser
