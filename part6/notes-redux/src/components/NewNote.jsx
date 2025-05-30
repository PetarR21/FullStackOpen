import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/noteReducer'

const NewNote = () => {
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createNote(newNote))
  }

  return (
    <form onSubmit={addNote}>
      <input name='note' />
      <button type='submt'>add</button>
    </form>
  )
}

export default NewNote
