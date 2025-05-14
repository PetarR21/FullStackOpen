import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = ({ handleLogout }) => {
  const user = useSelector((state) => state.user)

  return (
    <nav className='navbar'>
      <div>
        <Link className='link' to='/'>
          blogs
        </Link>
      </div>
      <div>
        <Link className='link' to='/users'>
          users
        </Link>
      </div>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
    </nav>
  )
}

export default Navbar
