import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [timeoutID, setTimeoutID] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = (notification) => {
    setNotification(notification)

    if (timeoutID) {
      clearTimeout(timeoutID)
      setTimeoutID(null)
    }

    setTimeoutID(
      setTimeout(() => {
        setNotification(null)
      }, 4000)
    )
  }

  const handleLogin = async (credentialsObject) => {
    try {
      const user = await loginService.login(credentialsObject)

      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setNotification(null)
    } catch (error) {
      showNotification({ message: error.response.data.error, type: 'error' })
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    setUser(null)
    setNotification(null)
  }

  const addNewBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      blogFormRef.current.toggleVisibility()
      showNotification({
        message: `a new Blog ${newBlog.title} by ${newBlog.author} added`,
        type: 'success',
      })
    } catch (error) {
      showNotification({ message: error.response.data.error, type: 'error' })
    }
  }

  const updateBlogLikes = async (updatedLikes, id) => {
    try {
      const updatedBlog = await blogService.update(updatedLikes, id)
      showNotification({
        message: `Liked ${updatedBlog.title} blog`,
        type: 'success',
      })
      setBlogs(
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      )
    } catch (error) {
      showNotification({ message: error.response.data.error, type: 'error' })
    }
  }

  const removeBlog = async (blogToDelete) => {
    try {
      await blogService.remove(blogToDelete.id)
      setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id))
      showNotification({
        message: `Deleted ${blogToDelete.title} blog`,
        type: 'success',
      })
    } catch (error) {
      showNotification({ message: error.response.data.error, type: 'error' })
    }
  }

  const newBlogForm = () => {
    return (
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <NewBlogForm createBlog={addNewBlog} />
      </Togglable>
    )
  }

  if (user === null) {
    return <LoginForm login={handleLogin} notification={notification} />
  }

  const sortedBlogs = blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      {newBlogForm()}
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateLikes={updateBlogLikes}
          deleteBlog={removeBlog}
        />
      ))}
    </div>
  )
}

export default App
