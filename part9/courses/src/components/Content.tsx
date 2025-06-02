import type { CoursePart } from '../App'
import Part from './Part'

interface ContentProps {
  courseParts: CoursePart[]
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((p) => {
        return <Part part={p} />
      })}
    </div>
  )
}

export default Content
