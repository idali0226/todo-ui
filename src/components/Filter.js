import React from 'react'
import PropTypes from 'prop-types'
import Dropdown from 'react-dropdown'

const propTypes = {
  handleFilterUpdate: PropTypes.func.isRequired,
  currentFilter: PropTypes.string.isRequired,
}

class Filter extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.currentFilter !== prevState.currentFilter) {
      return {
        currentFilter: nextProps.currentFilter,
      }
    }

    // No state update necessary
    return null
  }

  constructor(props) {
    super(props)
    this.state = {
      currentFilter: props.currentFilter,
    }

    this.handleFilterUpdate = this.handleFilterUpdate.bind(this)
  }

  handleFilterUpdate(value) {
    this.props.handleFilterUpdate(value)
  }

  render() {
    const filterOptions = ['All', 'New', 'Done']

    return (
      <div>
        <Dropdown
          options={filterOptions}
          onChange={this.handleFilterUpdate}
          value={this.state.currentFilter}
          placeholder="Select an option"
        />
      </div>
    )
  }
}

Filter.propTypes = propTypes

export default Filter
