import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState(null)

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
    setTimeout(() => {
      setNotification(null)
    }, 4000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
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

  const addNewBlog = async (event) => {
    event.preventDefault()

    const newBlog = await blogService.create({ title, author, url })
    setBlogs(blogs.concat(newBlog))
    showNotification({
      message: `a new Blog ${title} by ${author} added`,
      type: 'success',
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const newBlogForm = () => {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={addNewBlog}>
          <div>
            <label htmlFor='title'>title</label>
            <input
              id='title'
              name='title'
              type='text'
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            <label htmlFor='author'>author</label>
            <input
              id='author'
              name='author'
              type='text'
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            <label htmlFor='url'>url</label>
            <input
              id='url'
              name='url'
              type='text'
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type='submit'>create</button>
        </form>
      </div>
    )
  }

  if (user === null) {
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
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
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
