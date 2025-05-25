/* eslint-disable react/prop-types */
import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onCompleted: () => {
      setTitle('')
      setPublished('')
      setAuthor('')
      setGenres([])
      setGenre('')

      props.setPage('books')
    },
    onError: (error) => {
      console.log(error.graphQLErrors)
      const messages = error.graphQLErrors.map((e) => e.message).join('\n')
      props.setError(messages)
    },
    update: (cache, response) => {
      cache.updateQuery(
        { query: ALL_BOOKS, variables: { genre: 'all' } },
        ({ allBooks }) => {
          return {
            allBooks: allBooks.concat(response.data.addBook),
          }
        }
      )
      genres.forEach((g) => {
        if (cache.readQuery({ query: ALL_BOOKS, variables: { genre: g } })) {
          cache.updateQuery(
            { query: ALL_BOOKS, variables: { genre: g } },
            ({ allBooks }) => {
              return {
                allBooks: allBooks.concat(response.data.addBook),
              }
            }
          )
        }
      })
    },
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    addBook({
      variables: { title, author, published: Number(published), genres },
    })
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type='button'>
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook
