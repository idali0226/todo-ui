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
      registerUser: false,
    }

    this.handleUserForm = this.handleUserForm.bind(this)
    this.onCreateUser = this.onCreateUser.bind(this)
  }

  onCreateUser(name) {
    this.setState({
      registerUser: !this.state.registerUser,
    })
    this.props.createUser(name)
  }

  handleUserForm(event) {
    event.preventDefault()

    this.setState({
      registerUser: !this.state.registerUser,
    })
  }

  render() {
    if (this.state.registerUser) {
      return (
        <UserForm
          createUser={this.onCreateUser}
          onCancel={this.handleUserForm}
        />
      )
    }

    return (
      <span>
        <a href="" onClick={this.handleUserForm}>
          <h3>Register new user</h3>
        </a>
      </span>
    )
  }
}
CreateUser.propTypes = propTypes
export default CreateUser
