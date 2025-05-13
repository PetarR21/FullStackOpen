import { useState } from 'react'
import { updateBlogLikes } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { deleteBlog } from '../reducers/blogsReducer'

const Blog = ({ blog }) => {
  const [view, setView] = useState(false)
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const showWhenVisible = { display: view ? '' : 'none' }

  const toggleView = () => {
    setView(!view)
  }

  const likeBlog = (event) => {
    event.preventDefault()

    try {
      dispatch(updateBlogLikes({ ...blog, likes: blog.likes + 1 }))
      dispatch(
        setNotification(
          {
            message: `Liked ${blog.title} blog`,
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

  const removeBlog = (event) => {
    event.preventDefault()

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      try {
        dispatch(deleteBlog(blog.id))

        dispatch(
          setNotification(
            {
              message: `Deleted ${blog.title} blog`,
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
  }

  const removeButtonVisible =
    JSON.parse(localStorage.getItem('loggedBlogAppUser')).username ===
    blog.user.username

  return (
    <div className='blog' style={blogStyle}>
      <div className='visibleByDefault'>
        <span>{blog.title}</span> <span>{blog.author}</span>
        <button className='viewButton' onClick={toggleView}>
          {view ? 'hide' : 'view'}
        </button>
      </div>
      <div className='hiddenByDefault' style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>
          <span>likes {blog.likes}</span>
          <button className='likeButton' onClick={likeBlog}>
            like
          </button>
        </p>
        <p>{blog.user.name}</p>

        {removeButtonVisible ? (
          <button className='removeButton' onClick={removeBlog}>
            remove
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default Blog
