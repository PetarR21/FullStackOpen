import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUser, logoutUser } from './reducers/userReducer'
import { Route, Routes, Link, useMatch } from 'react-router-dom'
import Users from './components/Users'

const App = () => {
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const blogs = useSelector(({ notification, blogs }) => {
    return [...blogs].sort((blog1, blog2) => blog2.likes - blog1.likes)
  })

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const handleLogout = () => {
    dispatch(logoutUser())
    setNotification(null)
  }

  const newBlogForm = () => {
    return (
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <NewBlogForm blogFormRef={blogFormRef} handleLogout={handleLogout} />
      </Togglable>
    )
  }

  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  if (user === null) {
    return <LoginForm />
  }

  return (
    <div>
      <nav>
        <div>
          <Link to='/'>blogs</Link>
        </div>
        <div>
          <Link to='/users'>users</Link>
        </div>
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>
      </nav>
      <h1>blog app</h1>
      <Notification />

      <Routes>
        <Route
          path='/'
          element={
            <>
              {newBlogForm()}{' '}
              {blogs.map((blog) => (
                <Link
                  className='blogLink'
                  to={`/blogs/${blog.id}`}
                  key={blog.id}
                >
                  {blog.title}
                </Link>
              ))}
            </>
          }
        />
        <Route path='/blogs/:id' element={<Blog blog={blog} />} />
        <Route path='/users/*' element={<Users />} />
      </Routes>
    </div>
  )
}

export default App
