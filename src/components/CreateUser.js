import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import UserForm from './UserForm'
import { toggleFormOpen } from '../actions'

const propTypes = {
  toggleFormOpen: PropTypes.func,
  registerFormOpen: PropTypes.bool,
}

const defaultProps = {
  toggleFormOpen: undefined,
  registerFormOpen: undefined,
}

const mapStateToProps = state => {
  return {
    registerFormOpen: state.users.registerFormOpen,
  }
}

const mapDispatchToProps = {
  toggleFormOpen,
}

class CreateUser extends React.Component {
  constructor() {
    super()

    this.handleToggleUserForm = this.handleToggleUserForm.bind(this)
  }

  handleToggleUserForm = e => {
    e.preventDefault()
    this.props.toggleFormOpen(true)
  }

  render() {
    if (this.props.registerFormOpen) {
      return <UserForm />
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
