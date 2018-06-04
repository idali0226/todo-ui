import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { updateStatusFilter, fetchTodosByUserId } from '../actions'
import Filter from './Filter'
import { getCurrentUserId } from '../selectors'

const propTypes = {
  userId: PropTypes.number,
  fetchTodosByUserId: PropTypes.func,
  updateStatusFilter: PropTypes.func.isRequired,
  currentFilter: PropTypes.string.isRequired,
}

const defaultProps = {
  userId: undefined,
  fetchTodosByUserId: undefined,
}

const mapStateToProps = state => {
  return {
    currentFilter: state.todos.currentTodoFilter,
    userId: getCurrentUserId(state),
  }
}

const mapDispatchToProps = {
  updateStatusFilter,
  fetchTodosByUserId,
}

class StatusFilter extends React.Component {
  constructor() {
    super()

    this.handleStatusFilterUpdate = this.handleStatusFilterUpdate.bind(this)
  }

  handleStatusFilterUpdate = ({ value }) => {
    this.props.updateStatusFilter(value)
    this.props.fetchTodosByUserId(this.props.userId, value)
  }

  render() {
    const options = ['All', 'New', 'Done']
    return (
      <div>
        <Filter
          onFilterUpdate={this.handleStatusFilterUpdate}
          currentFilter={this.props.currentFilter}
          options={options}
        />
      </div>
    )
  }
}

StatusFilter.propTypes = propTypes
StatusFilter.defaultProps = defaultProps
export default connect(mapStateToProps, mapDispatchToProps)(StatusFilter)
