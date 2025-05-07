/* eslint-disable react/prop-types */
const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <p>
        has {anecdote.votes} {anecdote.votes === 1 ? 'vote' : 'votes'}
        <p>
          for more info see <a href={anecdote.info}>{anecdote.info}</a>
        </p>
      </p>
    </div>
  )
}

export default Anecdote
