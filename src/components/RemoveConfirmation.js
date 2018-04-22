import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  onDelete: PropTypes.func.isRequired,
}

class RemoveConfirmation extends React.Component {
  constructor() {
    super()
    this.state = {
      showConfirm: false,
    }

    this.confirmDelete = this.confirmDelete.bind(this)
    this.toggleConfirmMessage = this.toggleConfirmMessage.bind(this)
  }

  toggleConfirmMessage(event) {
    event.preventDefault()

    this.setState({
      showConfirm: !this.state.showConfirm,
    })
  }

  confirmDelete(event) {
    event.preventDefault()
    this.props.onDelete()
  }

  render() {
    const confirmNode = (
      <a href="" onClick={this.toggleConfirmMessage}>
        Delete?
      </a>
    )
    if (this.state.showConfirm) {
      return (
        <span>
          <a href="" onClick={this.confirmDelete}>
            Yes{' '}
          </a>{' '}
          - or -{' '}
          <a href="" onClick={this.toggleConfirmMessage}>
            {' '}
            No
          </a>
        </span>
      )
    }

    return <span>{confirmNode}</span>
  }
}

RemoveConfirmation.propTypes = propTypes

export default RemoveConfirmation
