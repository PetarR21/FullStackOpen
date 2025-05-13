import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogsReducer'

const App = () => {
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const blogs = useSelector(({ notification, blogs }) => {
    return [...blogs].sort((blog1, blog2) => blog2.likes - blog1.likes)
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (credentialsObject) => {
    try {
      const user = await loginService.login(credentialsObject)

      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      dispatch(
        setNotification(
          { message: `${user.name} logged in`, type: 'success' },
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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    setUser(null)
    setNotification(null)
  }

  const newBlogForm = () => {
    return (
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <NewBlogForm blogFormRef={blogFormRef} />
      </Togglable>
    )
  }

  if (user === null) {
    return <LoginForm login={handleLogin} />
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      {newBlogForm()}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
