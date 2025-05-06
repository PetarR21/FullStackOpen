import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const voteForAnecdote = (anecdote) => {
    dispatch(vote(anecdote))
    dispatch(setNotification(`You voted for ${anecdote.content}.`, 5))
  }

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (!filter) {
      return anecdotes
    }

    return anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().trim().includes(filter.toLowerCase().trim())
    )
  })

  return (
    <div>
      {anecdotes
        .toSorted((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => voteForAnecdote(anecdote)}
          />
        ))}
    </div>
  )
}

export default AnecdoteList
