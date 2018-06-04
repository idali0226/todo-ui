import React from 'react'
import Dropdown from 'react-dropdown'
import PropTypes from 'prop-types'

const propTypes = {
  onFilterUpdate: PropTypes.func.isRequired,
  currentFilter: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
}

class Filter extends React.Component {
  render() {
    const { options, onFilterUpdate, currentFilter } = this.props

    return (
      <div>
        <Dropdown
          options={options}
          onChange={onFilterUpdate}
          value={currentFilter}
          placeholder="Select an option"
        />
      </div>
    )
  }
}
Filter.propTypes = propTypes
export default Filter
