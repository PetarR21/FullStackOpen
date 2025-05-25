/* eslint-disable react/prop-types */
import { useMutation, useQuery } from '@apollo/client'

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import { useEffect, useState } from 'react'

import Select from 'react-select'

const Authors = (props) => {
  const [name, setName] = useState('Select')
  const [born, setBorn] = useState('')

  const result = useQuery(ALL_AUTHORS)

  const [editAuthor, editAuthorResult] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onCompleted: () => {
      setName('')
      setBorn('')
    },
  })

  useEffect(() => {
    if (editAuthorResult.data && editAuthorResult.data.editAuthor === null) {
      props.setError('author not found')
    }
  }, [editAuthorResult.data])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const updateAuthor = (event) => {
    event.preventDefault()

    editAuthor({ variables: { name: name.value, setBornTo: Number(born) } })
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Set birth year</h3>
      <form onSubmit={updateAuthor}>
        <div>
          <Select
            defaultValue={name}
            onChange={setName}
            options={authors.map((author) => {
              return { value: author.name, label: author.name }
            })}
          />
        </div>
        <div>
          <label htmlFor='born'>born</label>
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
