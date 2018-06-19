import React from 'react'
import TodoView from './TodoView'
import EditTodo from './EditTodo'

class TodoItem extends React.Component {
  constructor() {
    super()
    this.handleToggleEditForm = this.handleToggleEditForm.bind(this)

    this.state = {
      isEdit: false,
    }
  }

  handleToggleEditForm = () => {
    this.setState({
      isEdit: !this.state.isEdit,
    })
  }

  render() {
    const { ...todo } = this.props

    if (this.state.isEdit) {
      return <EditTodo {...todo} onCloseEditForm={this.handleToggleEditForm} />
    }
    return <TodoView {...todo} onEdit={this.handleToggleEditForm} />
  }
}

export default TodoItem
