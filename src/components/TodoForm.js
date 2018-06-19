import React from 'react'
import { Field, reduxForm, propTypes } from 'redux-form'
import { connect } from 'react-redux'
import InputField from './InputField'

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Name is equired'
  }
  return errors
}

const capitalizedValue = value =>
  value && value.slice(0, 1).toUpperCase() + value.slice(1, value.length)

class TodoForm extends React.Component {
  static propTypes = {
    ...propTypes,
  }

  render() {
    const { handleSubmit, isEdit } = this.props

    const buttonText = isEdit ? 'Update' : 'Create TODO Item'
    let statusNode
    if (isEdit) {
      statusNode = (
        <Field
          type="text"
          name="status"
          component={InputField}
          label="Status"
        />
      )
    }
    return (
      <div>
        <form onSubmit={handleSubmit} className="todo-form">
          <label htmlFor="todoInput">
            New todo
            <div className="todo-form-fields" id="todoInput">
              <Field
                type="text"
                name="name"
                component={InputField}
                label="Name"
                normalize={capitalizedValue}
              />
              <Field
                name="description"
                component="textarea"
                placeholder="Description"
                normalize={capitalizedValue}
              />
              {statusNode}
            </div>
          </label>

          <div className="todo-form-actions">
            <button type="submit">{buttonText}</button>
          </div>
        </form>
      </div>
    )
  }
}

TodoForm = reduxForm({
  form: 'todoForm',
  validate,
})(TodoForm)

TodoForm = connect(state => ({
  initalValues: state.todos.todo,
}))(TodoForm)

export default TodoForm
