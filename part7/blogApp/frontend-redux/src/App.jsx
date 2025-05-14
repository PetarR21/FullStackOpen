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
import { Route, Routes, Link, useMatch, useNavigate } from 'react-router-dom'
import Users from './components/Users'
import Navbar from './components/Navbar'

const App = () => {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()

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
    navigate('/login')
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
    <div className='container'>
      <Routes>
        <Route
          path='/'
          element={
            <div className='blogPage'>
              <div>
                <Navbar handleLogout={handleLogout} />
                <h1>Blog App</h1>
                <Notification />
              </div>
              {newBlogForm()}{' '}
              <div className='blogs'>
                {blogs.map((blog) => (
                  <Link
                    className='blogLink'
                    to={`/blogs/${blog.id}`}
                    key={blog.id}
                  >
                    {blog.title}
                  </Link>
                ))}
              </div>
            </div>
          }
        />
        <Route
          path='/blogs/:id'
          element={
            <div>
              <Navbar handleLogout={handleLogout} />
              <Notification />
              <Blog blog={blog} />
            </div>
          }
        />
        <Route
          path='/users/*'
          element={
            <div>
              <Navbar handleLogout={handleLogout} />
              <Users />
            </div>
          }
        />
        <Route path='/login' element={<LoginForm />} />
      </Routes>
    </div>
  )
}

export default App
