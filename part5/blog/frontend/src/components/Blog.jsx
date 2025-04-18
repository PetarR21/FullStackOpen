import { useState } from 'react'

const Blog = ({ blog, updateLikes, deleteBlog }) => {
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

  const likeBlog = (event) => {
    event.preventDefault()

    updateLikes({ likes: blog.likes + 1 }, blog.id)
  }

  const removeBlog = (event) => {
    event.preventDefault()

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`))
      deleteBlog(blog)
  }

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
          likes {blog.likes}{' '}
          <button className='likeButton' onClick={likeBlog}>
            like
          </button>
        </p>
        <p>{blog.user.name}</p>
        <div>
          <button onClick={removeBlog}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog
