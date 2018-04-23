import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  addTodo: PropTypes.func,
  editTodo: PropTypes.func,
  isEdit: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
}

const defaultProps = {
  addTodo: undefined,
  editTodo: undefined,
}

class TodosForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEdit: this.props.isEdit,
      id: this.props.isEdit ? this.props.id : '',
      name: this.props.isEdit ? this.props.name : '',
      description: this.props.isEdit ? this.props.description : '',
      status: this.props.isEdit ? this.props.status : 'New',
      buttonText: this.props.isEdit ? 'Update' : 'Create TODO Item',
    }
  }

  onSubmit = e => {
    e.preventDefault()

    if (this.state.isEdit) {
      this.props.editTodo(
        this.state.id,
        this.state.name,
        this.state.description,
        this.state.status
      )

      this.setState({
        isEdit: false,
      })
    } else {
      this.props.addTodo(this.state.name, this.state.description)

      this.setState({
        name: '',
        description: '',
        isEdit: false,
      })
    }
  }

  render() {
    const { state } = this

    let statusNode
    if (this.state.isEdit) {
      statusNode = (
        <input
          id="status"
          placeholder="Status"
          value={state.status}
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
              value={state.name}
              onChange={e => this.setState({ name: e.target.value })}
            />
            <textarea
              id="description"
              placeholder="Description"
              onChange={e => this.setState({ description: e.target.value })}
              value={state.description}
            />
            {statusNode}
          </div>

          <div className="todo-form-actions">
            <button type="submit">{this.state.buttonText}</button>
          </div>
        </form>
      </div>
    )
  }
}

TodosForm.propTypes = propTypes
TodosForm.defaultProps = defaultProps

export default TodosForm
