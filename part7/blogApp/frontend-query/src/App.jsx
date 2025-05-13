import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'
import LoginForm from './components/LoginForm'
import { useQuery } from '@tanstack/react-query'
import { useRemoveNotification } from './context/NotificationContext'
import {
  useInitializeUser,
  useRemoveUser,
  useUserValue,
} from './context/UserContext'

const App = () => {
  const user = useUserValue()
  const initializeUser = useInitializeUser()

  const blogFormRef = useRef()

  const removeNotification = useRemoveNotification()

  const removeUser = useRemoveUser()

  useEffect(() => {
    initializeUser()
  }, [])

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const blogs = result.data

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    removeUser()
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
    return <LoginForm />
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
