import { updateBlogLikes } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { deleteBlog } from '../reducers/blogsReducer'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!blog) {
    return null
  }

  const likeBlog = (event) => {
    event.preventDefault()

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
  }

  const removeBlog = (event) => {
    event.preventDefault()

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
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

      navigate('/')
    }
  }

  const removeButtonVisible =
    JSON.parse(localStorage.getItem('loggedBlogAppUser')).username ===
    blog.user.username

  return (
    <div className='blog'>
      <div>
        <h2>
          <span>{blog.title}</span> <span>{blog.author}</span>
        </h2>
      </div>
      <div>
        <a href={blog.url}>{blog.url}</a>
        <p>
          <span>likes {blog.likes}</span>
          <button className='likeButton' onClick={likeBlog}>
            like
          </button>
        </p>
        <p>added by{blog.user.name}</p>

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
