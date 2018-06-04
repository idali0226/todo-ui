import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { toggleFormOpen, createUser, resetTodos } from '../actions'

const propTypes = {
  createUser: PropTypes.func.isRequired,
  resetTodos: PropTypes.func.isRequired,
  toggleFormOpen: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  toggleFormOpen,
  createUser,
  resetTodos,
}

class UserForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
    }

    this.handleCancelUserForm = this.handleCancelUserForm.bind(this)
  }

  onSubmit = e => {
    e.preventDefault()

    const { name } = this.state
    if (name) {
      const capitalrizedName =
        name.slice(0, 1).toUpperCase() + name.slice(1, name.length)

      this.props.createUser(capitalrizedName)
      this.props.resetTodos()
      this.props.toggleFormOpen(false)

      this.setState({
        name: '',
      })
    }
  }

  handleCancelUserForm = e => {
    e.preventDefault()
    this.props.toggleFormOpen(false)
  }

  render() {
    const { name } = this.state
    return (
      <div>
        <form onSubmit={this.onSubmit} className="todo-form">
          <label htmlFor="userInput">
            New user
            <div className="todo-form-fields" id="userInput">
              <input
                id="name"
                placeholder="Name"
                value={name}
                onChange={e => this.setState({ name: e.target.value })}
              />
            </div>
          </label>

          <div className="todo-form-actions">
            <button onClick={this.handleCancelUserForm}>Cancel</button>

            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}
UserForm.propTypes = propTypes
export default connect(undefined, mapDispatchToProps)(UserForm)
