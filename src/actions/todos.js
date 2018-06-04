import fetch from 'cross-fetch'
import * as actionTypes from '../constants/actionTypes'
import { API } from '../constants/appConstants'

const buildQuery = queryParms => {
  return Object.keys(queryParms).reduce((query, key) => {
    if (queryParms[key] !== 'All' && queryParms[key] !== undefined) {
      const value = `${key}=${queryParms[key]}`
      if (query) {
        return `${query}&${value}`
      }
      return value
    }
    return query
  }, '')
}

export const resetTodos = () => {
  return {
    type: actionTypes.RESET_TODOS,
    todos: [],
  }
}

export const createTodo = (name, description, userId) => {
  const newTodo = {
    name,
    description,
    status: 'New',
    userId,
  }

  const options = {
    method: 'POST',
    body: JSON.stringify(newTodo),
    headers: {
      'Content-Type': 'application/json',
    },
  }

  return dispatch => {
    dispatch({
      type: actionTypes.CREATE_TODO_REQUEST,
      isPersistingTodo: true,
    })
    return fetch(`${API}/todos`, options).then(
      response => {
        return response.json().then(res => {
          dispatch({
            type: actionTypes.CREATE_TODO_SUCCESS,
            payload: res,
          })
          return res
        })
      },
      error => {
        dispatch({
          type: actionTypes.CREATE_USER_FAILURE,
          error: true,
          payload: error,
        })
        return error
      }
    )
  }
}

export const updateTodo = (id, name, description, capitalizedStatus) => {
  const editedTodo = {
    id,
    name,
    description,
    status: capitalizedStatus,
  }
  const options = {
    method: 'PUT',
    body: JSON.stringify(editedTodo),
    headers: {
      'Content-Type': 'application/json',
    },
  }

  return dispatch => {
    dispatch({
      type: actionTypes.UPDATE_TODO_REQUEST,
    })
    return fetch(`${API}/todos/${id}`, options).then(
      response => {
        return response.json().then(res => {
          dispatch({
            type: actionTypes.UPDATE_TODO_SUCCESS,
            payload: res,
          })
          return res
        })
      },
      error => {
        dispatch({
          type: actionTypes.UPDATE_TODO_FAILURE,
          error: true,
          payload: error,
        })
        return error
      }
    )
  }
}

export const fetchTodos = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.FETCH_TODOS_REQUEST,
    })
    return fetch(`${API}/todos`).then(
      response => {
        return response.json().then(res => {
          dispatch({
            type: actionTypes.FETCH_TODOS_SUCCESS,
            payload: res,
          })
          return res
        })
      },
      error => {
        dispatch({
          type: actionTypes.FETCH_TODOS_FAILURE,
          error: true,
          payload: error,
        })
        return error
      }
    )
  }
}

export const fetchTodosByUserId = (userId, status) => {
  const queryParms = {
    status,
    userId,
  }

  const query = buildQuery(queryParms)

  return dispatch => {
    dispatch({
      type: actionTypes.FETCH_TODOS_BY_USERID_REQUEST,
    })
    return fetch(`${API}/todos/search?${query}`).then(
      response => {
        return response.json().then(res => {
          dispatch({
            type: actionTypes.FETCH_TODOS_BY_USERID_SUCCESS,
            payload: res,
          })
          return res
        })
      },
      error => {
        dispatch({
          type: actionTypes.FETCH_TODOS_BY_USERID_FAILURE,
          error: true,
          payload: error,
        })
        return error
      }
    )
  }
}

export const changeTodoStatus = (id, status) => {
  const editedTodo = {
    id,
    status,
  }

  const options = {
    method: 'PATCH',
    body: JSON.stringify(editedTodo),
    headers: {
      'Content-Type': 'application/json',
    },
  }

  return dispatch => {
    dispatch({
      type: actionTypes.CHANGE_TODO_STATUS_REQUEST,
    })
    return fetch(`${API}/todos/${id}`, options).then(
      response => {
        return response.json().then(res => {
          dispatch({
            type: actionTypes.CHANGE_TODO_STATUS_SUCCESS,
            payload: res,
          })
          return res
        })
      },
      error => {
        dispatch({
          type: actionTypes.CHANGE_TODO_STATUS_FAILURE,
          error: true,
          payload: error,
        })
        return error
      }
    )
  }
}

export const deleteTodo = id => {
  const options = {
    method: 'DELETE',
  }

  return dispatch => {
    dispatch({
      type: actionTypes.DELETE_TODO_REQUEST,
    })
    return fetch(`${API}/todos/${id}`, options).then(
      response => {
        return response.json().then(res => {
          dispatch({
            type: actionTypes.DELETE_TODO_SUCCESS,
            id,
          })
          return res
        })
      },
      error => {
        dispatch({
          type: actionTypes.DELETE_TODO_FAILURE,
          error: true,
          payload: error,
        })
      }
    )
  }
}

export const updateStatusFilter = status => {
  return {
    type: actionTypes.UPDATE_STATUS_FILTER,
    status,
  }
}
