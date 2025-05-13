/* eslint-disable indent */
import { createContext, useContext, useReducer } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'REMOVE':
      return null
  }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null)

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  const context = useContext(UserContext)
  return context[0]
}

export const useUserDispatch = () => {
  const context = useContext(UserContext)
  return context[1]
}

export const useInitializeUser = () => {
  const dispatch = useUserDispatch()

  return () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch({ type: 'SET', payload: user })
      blogService.setToken(user.token)
    }
  }
}

export const useSetUser = () => {
  const dispatch = useUserDispatch()

  return (payload) => {
    dispatch({ type: 'SET', payload })
  }
}

export const useRemoveUser = () => {
  const dispatch = useUserDispatch()

  return () => {
    dispatch({ type: 'REMOVE' })
  }
}

export default UserContext
