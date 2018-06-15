import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
}

const defaultProps = {
  meta: undefined,
}

class InputField extends React.Component {
  render() {
    const {
      input,
      label,
      type,
      meta: { touched, error },
    } = this.props

    return (
      <div>
        <div className="todo-form-fields" id="user">
          <input {...input} type={type} placeholder={label} />
        </div>
        {touched && error && <div className="error_text">{error}</div>}
      </div>
    )
  }
}

InputField.propTypes = propTypes
InputField.defaultProps = defaultProps
export default InputField
