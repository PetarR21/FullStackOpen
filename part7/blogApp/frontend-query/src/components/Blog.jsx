import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import blogService from '../services/blogs'
import { useNotify } from '../context/NotificationContext'

const Blog = ({ blog }) => {
  const queryClient = useQueryClient()
  const notify = useNotify()

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      notify({
        message: `Liked ${blog.title} blog`,
        type: 'success',
      })
    },
    onError: (error) => {
      notify({ message: error.response.data.error, type: 'error' })
    },
  })

  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      notify({ message: `Deleted ${blog.title} blog`, type: 'success' })
    },
    onError: (error) => {
      notify({ message: error.response.data.error, type: 'error' })
    },
  })

  const [view, setView] = useState(false)

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

  const likeBlog = () => {
    updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }

  const removeBlog = (event) => {
    event.preventDefault()

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      removeBlogMutation.mutate(blog.id)
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
