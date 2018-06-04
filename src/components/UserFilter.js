import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { updateUserFilter, fetchTodosByUserId } from '../actions'
import Filter from './Filter'
import { getUserOptions } from '../selectors'

const propTypes = {
  users: PropTypes.array.isRequired,
  updateUserFilter: PropTypes.func.isRequired,
  fetchTodosByUserId: PropTypes.func.isRequired,
  currentFilter: PropTypes.string.isRequired,
  currentStatus: PropTypes.string,
  options: PropTypes.array.isRequired,
}

const defaultProps = {
  currentStatus: undefined,
}

const mapStateToProps = state => {
  return {
    options: getUserOptions(state),
    currentFilter: state.users.currentUserFilter,
    currentStatus: state.todos.currentTodoFilter,
    users: state.users.users,
  }
}

const mapDispatchToProps = {
  updateUserFilter,
  fetchTodosByUserId,
}

class UserFilter extends React.Component {
  constructor() {
    super()
    this.handleFilterUpdate = this.handleFilterUpdate.bind(this)
  }

  getCurrentUserId = value => {
    const user = this.props.users.find(u => {
      return u.name === value
    })
    return user ? user.id : undefined
  }

  handleFilterUpdate = ({ value }) => {
    this.props.updateUserFilter(value)

    const currentUserId = this.getCurrentUserId(value)
    this.props.fetchTodosByUserId(currentUserId, this.props.currentStatus)
  }

  render() {
    const { currentFilter, options } = this.props
    return (
      <div>
        <Filter
          onFilterUpdate={this.handleFilterUpdate}
          currentFilter={currentFilter}
          options={options}
        />
      </div>
    )
  }
}

UserFilter.propTypes = propTypes
UserFilter.defaultProps = defaultProps
export default connect(mapStateToProps, mapDispatchToProps)(UserFilter)
