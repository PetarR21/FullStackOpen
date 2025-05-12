import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'
import LoginForm from './components/LoginForm'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

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

  const addNewBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      blogFormRef.current.toggleVisibility()
      dispatch(
        setNotification(
          {
            message: `a new Blog ${newBlog.title} by ${newBlog.author} added`,
            type: 'success',
          },
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

  const updateBlogLikes = async (updatedLikes, id) => {
    try {
      const updatedBlog = await blogService.update(updatedLikes, id)
      dispatch(
        setNotification(
          {
            message: `Liked ${updatedBlog.title} blog`,
            type: 'success',
          },
          4000
        )
      )
      setBlogs(
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
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

  const removeBlog = async (blogToDelete) => {
    try {
      await blogService.remove(blogToDelete.id)
      setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id))
      dispatch(
        setNotification(
          {
            message: `Deleted ${blogToDelete.title} blog`,
            type: 'success',
          },
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

  const newBlogForm = () => {
    return (
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <NewBlogForm createBlog={addNewBlog} />
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
