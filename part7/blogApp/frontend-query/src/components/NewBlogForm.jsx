import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import blogService from '../services/blogs'
import { useNotify } from '../context/NotificationContext'

const NewBlogForm = ({ blogFormRef, handleLogout }) => {
  const queryClient = useQueryClient()
  const notify = useNotify()

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      notify({
        message: `a new Blog ${title} by ${author} added`,
        type: 'success',
      })
      blogFormRef.current.toggleVisibility()
      setTitle('')
      setAuthor('')
      setUrl('')
    },
    onError: (error) => {
      if (error.response.data.error === 'token expired') {
        console.log('YES')
        handleLogout()
      }
      console.log(error)
      notify({ message: error.response.data.error, type: 'error' })
    },
  })

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addNewBlog = (event) => {
    event.preventDefault()
    newBlogMutation.mutate({ title, author, url })
  }

  return (
    <div className='formDiv'>
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
        <button id='create-button' type='submit'>
          create
        </button>
      </form>
    </div>
  )
}

export default NewBlogForm
