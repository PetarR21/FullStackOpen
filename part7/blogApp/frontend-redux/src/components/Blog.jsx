import { commentBlog, updateBlogLikes } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { deleteBlog } from '../reducers/blogsReducer'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Blog = ({ blog }) => {
  const [comment, setComment] = useState('')
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

  const addComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog.id, comment))
      .then(() => {
        setComment('')
        dispatch(
          setNotification(
            {
              message: `Commented on a ${blog.title} blog`,
              type: 'success',
            },
            4000
          )
        )
      })
      .catch((error) => {
        dispatch(
          setNotification(
            {
              message: error.response.data.error,
              type: 'error',
            },
            4000
          )
        )
      })
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
      <div className='details'>
        <a href={blog.url}>{blog.url}</a>
        <p>
          <span>likes {blog.likes}</span>
          <button className='likeButton' onClick={likeBlog}>
            like
          </button>
        </p>
        <p>
          added by <strong>{blog.user.name}</strong>
        </p>

        {removeButtonVisible ? (
          <div>
            <button className='removeButton' onClick={removeBlog}>
              remove
            </button>
          </div>
        ) : null}
      </div>
      <div className='comments'>
        <h3>comments</h3>
        <form onSubmit={addComment}>
          <input
            type='text'
            value={comment}
            onChange={({ target }) => {
              setComment(target.value)
            }}
          />
          <button type='submit'>add comment</button>
        </form>
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Blog
