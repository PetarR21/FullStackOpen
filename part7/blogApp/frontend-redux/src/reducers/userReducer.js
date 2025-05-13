import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const slice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser(state, action) {
      return null
    },
  },
})

export const { setUser, removeUser } = slice.actions

export const initializeUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const loginUser = (credentialsObject) => {
  return async (dispatch) => {
    const user = await loginService.login(credentialsObject)
    dispatch(setUser(user))
    blogService.setToken(user.token)
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(removeUser())
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
  }
}

export default slice.reducer
