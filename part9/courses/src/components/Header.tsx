interface HeaderProps {
  courseName: string
}

const Header = ({ courseName }: HeaderProps) => {
  return (
    <header>
      <h1>{courseName}</h1>
    </header>
  )
}

export default Header
