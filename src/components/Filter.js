import React from 'react'
import PropTypes from 'prop-types'
import Dropdown from 'react-dropdown'

const propTypes = {
  onFilterUpdate: PropTypes.func.isRequired,
  currentFilter: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
}

class Filter extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.currentFilter !== prevState.currentFilter) {
      return {
        currentFilter: nextProps.currentFilter,
      }
    }

    if (nextProps.users !== prevState.users) {
      return {
        options: nextProps.users,
      }
    }

    // No state update necessary
    return null
  }

  constructor(props) {
    super(props)
    this.state = {
      currentFilter: props.currentFilter,
      options: props.options,
    }
  }

  render() {
    const { currentFilter, options } = this.state

    return (
      <div>
        <Dropdown
          options={options}
          onChange={this.props.onFilterUpdate}
          value={currentFilter}
          placeholder="Select an option"
        />
      </div>
    )
  }
}

Filter.propTypes = propTypes

export default Filter
