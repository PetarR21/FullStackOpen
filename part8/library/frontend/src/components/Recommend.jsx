/* eslint-disable react/prop-types */
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'
import { useEffect, useState } from 'react'

const Recommend = ({ show, token }) => {
  const [genre, setGenre] = useState('')

  const meResult = useQuery(ME)
  const bookResult = useQuery(ALL_BOOKS, {
    variables: { genre: genre },
  })

  useEffect(() => {
    if (meResult.data?.me) {
      setGenre(meResult.data.me.favoriteGenre)
    }
  }, [meResult.data, meResult, bookResult])

  useEffect(() => {
    meResult.refetch()
    bookResult.refetch()
  }, [token])

  if (meResult.loading || bookResult.loading) {
    return <div>loading...</div>
  }

  if (!show) {
    return null
  }

  const books = bookResult.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favourite genre <strong>{genre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
