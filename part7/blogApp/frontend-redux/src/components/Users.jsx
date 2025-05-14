import { useState } from 'react'
import userService from '../services/users'
import { useEffect } from 'react'
import { Link, Route, Routes, useMatch } from 'react-router-dom'
import User from './User'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then((response) => {
      setUsers(response)
    })
  }, [])

  const match = useMatch('/users/:id')
  const user = match ? users.find((user) => user.id === match.params.id) : null

  return (
    <div>
      <Routes>
        <Route
          path='/'
          element={
            <div className='usersPage'>
              <h2>Users</h2>
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>blogs created</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <Link className='usersLink' to={`/users/${user.id}`}>
                          {user.name}
                        </Link>
                      </td>
                      <td>{user.blogs.length}</td>
                    </tr>
                  ))}
                  <tr></tr>
                </tbody>
              </table>
            </div>
          }
        />
        <Route path='/:id' element={<User user={user} />} />
      </Routes>
    </div>
  )
}

export default Users
