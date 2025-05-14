import { useState } from 'react'
import Notification from './Notification'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const notification = useSelector((state) => state.notification)

  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(loginUser({ username, password }))
      .then((res) => {
        dispatch(
          setNotification(
            { message: `${username} logged in`, type: 'success' },
            4000
          )
        )
        navigate('/')
      })
      .catch((error) =>
        dispatch(
          setNotification(
            { message: 'invalid username or password', type: 'error' },
            4000
          )
        )
      )
  }

  return (
    <div className='login'>
      <h2>Log in to application</h2>
      <Notification notification={notification} />
      <form onSubmit={handleLogin}>
        <div className='login-group'>
          <label className='visually-hidden' htmlFor='username'>
            username
          </label>
          <input
            id='username'
            className='username'
            name='username'
            type='text'
            value={username}
            placeholder='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className='login-group'>
          <label className='visually-hidden' htmlFor='password'>
            password
          </label>
          <input
            id='password'
            className='username'
            name='password'
            type='password'
            value={password}
            placeholder='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type='submit'>
          log in
        </button>
      </form>
    </div>
  )
}

export default LoginForm
