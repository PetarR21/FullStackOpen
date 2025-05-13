import { useState } from 'react'
import Notification from './Notification'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const notification = useSelector((state) => state.notification)

  const handleLogin = (event) => {
    event.preventDefault()
    try {
      dispatch(loginUser({ username, password }))
      dispatch(
        setNotification(
          { message: `${username} logged in`, type: 'success' },
          4000
        )
      )
    } catch (error) {
      dispatch(
        setNotification(
          { message: error.response.data.error, type: 'error' },
          4000
        )
      )
    }
  }

  return (
    <div>
      <h2>log in to application</h2>
      <Notification notification={notification} />
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='username'>username</label>
          <input
            id='username'
            name='username'
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor='password'>password</label>
          <input
            id='password'
            name='password'
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type='submit'>
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
