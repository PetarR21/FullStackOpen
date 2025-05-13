import { useState } from 'react'
import userService from '../services/users'
import { useEffect } from 'react'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then((response) => {
      setUsers(response)
    })
  }, [])

  return (
    <div>
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
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </table>
    </div>
  )
}

export default Users
