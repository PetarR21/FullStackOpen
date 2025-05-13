import { useState } from 'react'
import Notification from './Notification'
import { useNotificationValue, useNotify } from '../context/NotificationContext'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { useSetUser } from '../context/UserContext'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const notification = useNotificationValue()
  const setUser = useSetUser()
  const notify = useNotify()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      notify({ message: `${user.name} logged in`, type: 'success' })
    } catch (error) {
      notify({ message: error.response.data.error, type: 'error' })
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
