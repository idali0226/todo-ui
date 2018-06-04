import fetch from 'cross-fetch'
import * as actionTypes from '../constants/actionTypes'
import { API } from '../constants/appConstants'

export const fetchUsers = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.FETCH_USERS_REQUEST,
    })
    return fetch(`${API}/users`).then(
      response => {
        return response.json().then(res => {
          dispatch({
            type: actionTypes.FETCH_USERS_SUCCESS,
            payload: res,
          })
          return res
        })
      },
      error => {
        dispatch({
          type: actionTypes.FETCH_USERS_FAILURE,
          error: true,
          payload: error,
        })
        return error
      }
    )
  }
}

export const createUser = capitalrizedName => {
  const newUser = {
    name: capitalrizedName,
  }

  const options = {
    method: 'POST',
    body: JSON.stringify(newUser),
    headers: {
      'Content-Type': 'application/json',
    },
  }

  return dispatch => {
    dispatch({
      type: actionTypes.CREATE_USER_REQUEST,
    })
    return fetch(`${API}/users`, options).then(
      response => {
        return response.json().then(res => {
          dispatch({
            type: actionTypes.CREATE_USER_SUCCESS,
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

export const toggleFormOpen = registerFormOpen => {
  return {
    type: actionTypes.TOGGLE_USER_FORM_OPEN,
    registerFormOpen,
  }
}

export const updateUserFilter = userName => {
  return {
    type: actionTypes.UPDATE_USER_FILTER,
    userName,
  }
}
