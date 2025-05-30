import { Link } from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <Link to='/' style={padding}>
        anecdotes
      </Link>
      <Link to='/create' href='#' style={padding}>
        create new
      </Link>
      <Link to='/about' href='#' style={padding}>
        about
      </Link>
    </div>
  )
}

export default Menu
