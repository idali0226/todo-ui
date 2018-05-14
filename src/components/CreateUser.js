import React from 'react'
import UserForm from './UserForm'

class CreateUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isNewUser: false,
    }

    this.handleUserForm = this.handleUserForm.bind(this)
    this.onCreateUser = this.onCreateUser.bind(this)
  }

  onCreateUser(name) {
    this.setState({
      isNewUser: !this.state.isNewUser,
    })
    this.props.createUser(name)
  }

  handleUserForm(event) {
    event.preventDefault()

    this.setState({
      isNewUser: !this.state.isNewUser,
    })
  }

  render() {
    if (this.state.isNewUser) {
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
          <h3>Regist user</h3>
        </a>
      </span>
    )
  }
}

export default CreateUser
