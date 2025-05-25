import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useEffect, useState } from 'react'

/* eslint-disable react/prop-types */
const Books = (props) => {
  const [currentGenre, setCurrentGenre] = useState('all')
  const [allGenres, setAllGenres] = useState([])

  const result = useQuery(ALL_BOOKS, {
    variables: { genre: currentGenre },
  })

  useEffect(() => {
    if (!result.loading) {
      const genres = result.data.allBooks
        .map((b) => b.genres)
        .flat()
        .filter((g, i, a) => a.indexOf(g) === i)
      if (allGenres.length === 0) {
        setAllGenres(genres)
      } else {
        genres.forEach((g) => {
          if (!allGenres.includes(g)) {
            setAllGenres([...allGenres, g])
          }
        })
      }
    }
  }, [result.loading, result.data?.allBooks, allGenres.length])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <strong>{currentGenre}</strong>
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
      <div>
        {allGenres.map((g) => (
          <button
            key={g}
            onClick={() => {
              setCurrentGenre(g)
            }}
          >
            {g}
          </button>
        ))}
        <button onClick={() => setCurrentGenre('all')}>all</button>
      </div>
    </div>
  )
}

export default Books
