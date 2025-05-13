/* eslint-disable indent */
import { createContext, useContext, useReducer, useState } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'REMOVE':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  )
  const [timeoutID, setTimeoutID] = useState(null)

  return (
    <NotificationContext.Provider
      value={[notification, notificationDispatch, timeoutID, setTimeoutID]}
    >
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const context = useContext(NotificationContext)
  return context[0]
}

export const useRemoveNotification = () => {
  const dispatch = useContext(NotificationContext)[1]

  return () => {
    dispatch({ type: 'REMOVE' })
  }
}

export const useNotify = () => {
  const context = useContext(NotificationContext)
  const dispatch = context[1]
  const timeoutID = context[2]
  const setTimeoutID = context[3]

  return (payload) => {
    if (timeoutID) {
      setTimeoutID(null)
      clearTimeout(timeoutID)
    }
    dispatch({ type: 'SET', payload })
    setTimeoutID(
      setTimeout(() => {
        dispatch({ type: 'REMOVE' })
      }, 4000)
    )
  }
}

export default NotificationContext
