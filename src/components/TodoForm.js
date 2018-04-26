import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  createTodo: PropTypes.func,
  onUpdate: PropTypes.func,
  isEdit: PropTypes.bool.isRequired,
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  status: PropTypes.string,
}

const defaultProps = {
  id: undefined,
  name: '',
  status: '',
  createTodo: undefined,
  onUpdate: undefined,
}

class TodosForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEdit: this.props.isEdit,
      id: this.props.isEdit ? this.props.id : 0,
      id: this.props.isEdit ? this.props.id : undefined,
      name: this.props.isEdit ? this.props.name : '',
      description: this.props.isEdit ? this.props.description : '',
      status: this.props.isEdit ? this.props.status : 'New',
    }
  }

  onSubmit = e => {
    e.preventDefault()

    const { id, name, description, status } = this.state
    if (this.state.isEdit) {
      this.props.onUpdate({ id, name, description, status })
      this.setState({
        isEdit: false,
      })
    } else {
      this.props.createTodo({ name, description })

      this.setState({
        name: '',
        description: '',
      })
    }
  }

  render() {
    const { description, name, status, isEdit } = this.state
    const buttonText = isEdit ? 'Update' : 'Create TODO Item'
    let statusNode
    if (isEdit) {
      statusNode = (
        <input
          id="status"
          placeholder="Status"
          value={status}
          onChange={e => this.setState({ status: e.target.value })}
        />
      )
    }
    return (
      <div>
        <form onSubmit={this.onSubmit} className="todo-form">
          <label htmlFor="todoInput">New todo</label>
          <div className="todo-form-fields" id="todoInput">
            <input
              id="name"
              placeholder="Name"
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
            />
            <textarea
              id="description"
              placeholder="Description"
              onChange={e => this.setState({ description: e.target.value })}
              value={description}
            />
            {statusNode}
          </div>

          <div className="todo-form-actions">
            <button type="submit">{buttonText}</button>
          </div>
        </form>
      </div>
    )
  }
}

TodosForm.propTypes = propTypes
TodosForm.defaultProps = defaultProps

export default TodosForm
