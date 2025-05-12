import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    addNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return null
    },
  },
})

export const { addNotification, removeNotification } = slice.actions

let timeoutID = null

export const setNotification = (notification, time) => {
  return (dispatch) => {
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
    dispatch(addNotification(notification))
    timeoutID = setTimeout(() => {
      dispatch(removeNotification())
    }, time)
  }
}

export default slice.reducer
