import React from 'react'
import { Field, reduxForm, propTypes } from 'redux-form'
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

class UserForm extends React.Component {
  static propTypes = {
    ...propTypes,
  }

  render() {
    const { handleSubmit, onCancel, submitting } = this.props

    return (
      <form onSubmit={handleSubmit} className="todo-form">
        <div>
          <h2>New User</h2>
        </div>
        <div className="todo-form-fields">
          <Field
            type="text"
            name="name"
            component={InputField}
            label="Name"
            normalize={capitalizedValue}
          />
        </div>
        <div className="todo-form-actions">
          <button type="button" disabled={submitting} onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" disabled={submitting}>
            Submit
          </button>
        </div>
      </form>
    )
  }
}

UserForm = reduxForm({
  form: 'userForm',
  validate,
})(UserForm)

export default UserForm
