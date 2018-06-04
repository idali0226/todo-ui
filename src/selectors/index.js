import { createSelector } from 'reselect'

const getUsers = state => state.users.users
const getCurrentUser = state => state.users.currentUserFilter

export const getUserOptions = createSelector([getUsers], users => {
  return ['All'].concat(users.map(value => value.name))
})

export const getCurrentUserId = createSelector(
  [getUsers, getCurrentUser],
  (users, currentUserName) => {
    const user = users.find(u => {
      return u.name === currentUserName
    })
    return user ? user.id : undefined
  }
)
