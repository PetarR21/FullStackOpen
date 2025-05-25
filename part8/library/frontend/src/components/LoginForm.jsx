/* eslint-disable react/prop-types */
import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { LOGIN } from '../queries'

const LoginForm = ({ show, setPage, setError, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    },
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      setUsername('')
      setPassword('')
      setPage('books')
    }
  }, [result.data])

  if (!show) {
    return null
  }

  const submit = (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  return (
    <form onSubmit={submit}>
      <div>
        <label htmlFor='username'>username</label>
        <input
          type='text'
          id='username'
          name='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label htmlFor='password'>password</label>
        <input
          type='password'
          id='password'
          name='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )
}

export default LoginForm
