import { useState, useEffect, useRef, useReducer } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'
import LoginForm from './components/LoginForm'
import { useQuery } from '@tanstack/react-query'
import { useNotify, useRemoveNotification } from './context/NotificationContext'

const App = () => {
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  const notify = useNotify()
  const removeNotification = useRemoveNotification()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const blogs = result.data

  const handleLogin = async (credentialsObject) => {
    try {
      const user = await loginService.login(credentialsObject)

      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      notify({ message: `${user.name} logged in`, type: 'success' })
    } catch (error) {
      notify({ message: error.response.data.error, type: 'error' })
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    setUser(null)
    removeNotification()
  }

  const newBlogForm = () => {
    return (
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <NewBlogForm blogFormRef={blogFormRef} handleLogout={handleLogout} />
      </Togglable>
    )
  }

  if (user === null) {
    return <LoginForm login={handleLogin} />
  }

  const sortedBlogs = blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      {newBlogForm()}
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
