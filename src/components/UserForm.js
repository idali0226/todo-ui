import React from 'react'

class UserForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
    }
  }

  onSubmit = e => {
    e.preventDefault()

    const { name } = this.state

    if (name) {
      const capitalrizedName =
        name.slice(0, 1).toUpperCase() + name.slice(1, name.length)
      this.props.createUser({ capitalrizedName })

      this.setState({
        name: '',
      })
    }
  }

  render() {
    const { name } = this.state
    return (
      <div>
        <form onSubmit={this.onSubmit} className="todo-form">
          <label htmlFor="todoInput">New user</label>
          <div className="todo-form-fields" id="todoInput">
            <input
              id="name"
              placeholder="Name"
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
            />
          </div>

          <div className="todo-form-actions">
            <button onClick={this.props.onCancel}>Cancel</button>

            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}
export default UserForm
