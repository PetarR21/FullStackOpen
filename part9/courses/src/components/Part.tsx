import type { CoursePart } from '../App'

interface PartProps {
  part: CoursePart
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const Part = ({ part }: PartProps) => {
  {
    switch (part.kind) {
      case 'basic':
        return (
          <div>
            <p>
              <strong>
                {part.name} {part.exerciseCount}
              </strong>
            </p>
            <p>
              <em>{part.description}</em>
            </p>
          </div>
        )

      case 'group':
        return (
          <div>
            <p>
              <strong>
                {part.name} {part.exerciseCount}
              </strong>
            </p>
            <p>project exercises {part.groupProjectCount}</p>
          </div>
        )
      case 'background':
        return (
          <div>
            <p>
              <strong>
                {part.name} {part.exerciseCount}
              </strong>
            </p>
            <p>
              <em>{part.description}</em>
            </p>
            <p>submit to {part.backgroundMaterial}</p>
          </div>
        )
      case 'special':
        return (
          <div>
            <p>
              <strong>
                {part.name} {part.exerciseCount}
              </strong>
            </p>
            <p>
              <em>{part.description}</em>
            </p>
            <p>
              required skills:{' '}
              {part.requirements.map((r, index, arr) => {
                return `${r}${index === arr.length - 1 ? ' ' : ', '}`
              })}
            </p>
          </div>
        )
      default:
        assertNever(part)
    }
  }
}

export default Part
