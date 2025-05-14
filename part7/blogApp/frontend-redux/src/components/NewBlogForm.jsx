import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewBlogForm = ({ blogFormRef, handleLogout }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const addNewBlog = async (event) => {
    event.preventDefault()

    dispatch(createBlog({ title, author, url }))
      .then(() => {
        blogFormRef.current.toggleVisibility()
        dispatch(
          setNotification(
            {
              message: `a new Blog ${title} by ${author} added`,
              type: 'success',
            },
            4000
          )
        )
        setTitle('')
        setAuthor('')
        setUrl('')
      })
      .catch((error) => {
        if (error.response.data.error === 'token expired') {
          handleLogout()
        }
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

  return (
    <div className='createForm'>
      <h2>create new</h2>
      <form onSubmit={addNewBlog}>
        <div>
          <label className='visually-hidden' htmlFor='title'>
            title
          </label>
          <input
            id='title'
            name='title'
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder='Title'
          />
        </div>
        <div>
          <label className='visually-hidden' htmlFor='author'>
            author
          </label>
          <input
            id='author'
            name='author'
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder='Author'
          />
        </div>
        <div>
          <label className='visually-hidden' htmlFor='url'>
            url
          </label>
          <input
            id='url'
            name='url'
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder='URL'
          />
        </div>
        <button id='create-button' type='submit'>
          create
        </button>
      </form>
    </div>
  )
}

export default NewBlogForm
