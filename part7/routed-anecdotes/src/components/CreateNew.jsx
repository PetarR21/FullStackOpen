/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import { useFiled } from '../hooks'

const CreateNew = (props) => {
  const content = useFiled('text')
  const author = useFiled('text')
  const info = useFiled('text')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.field.value,
      author: author.field.value,
      info: info.field.value,
      votes: 0,
    })
    navigate('/')
    props.showNotification(`a new anecdote ${content.value} created`)
  }

  const resetFields = (event) => {
    event.preventDefault()

    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.field} />
        </div>
        <div>
          author
          <input {...author.field} />
        </div>
        <div>
          url for more info
          <input {...info.field} />
        </div>
        <button type='submit'>create</button>
        <button onClick={resetFields}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
