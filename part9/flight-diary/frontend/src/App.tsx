import { useEffect, useState } from 'react'
import type { Diary } from './types'
import { createDiary, getAllDiaries } from './diaryService'

import Notification from './Notification'

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([])
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')
  const [notification, setNotification] = useState('')

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data)
    })
  }, [])

  const showNotification = (message: string) => {
    setNotification(message)
    setTimeout(() => {
      setNotification('')
    }, 4000)
  }

  const addDiary = (event: React.SyntheticEvent) => {
    event.preventDefault()

    createDiary({ date, visibility, weather, comment })
      .then((data) => {
        setDiaries(diaries.concat(data))
        setDate('')
        setVisibility('')
        setWeather('')
        setComment('')
      })
      .catch((error) => {
        showNotification(error.response.data.error[0].message)
      })
  }

  return (
    <div>
      <h2>Add new entry</h2>
      <Notification notification={notification} />
      <form onSubmit={addDiary}>
        <div className='form-group'>
          <label htmlFor='date'>Date </label>
          <input
            value={date}
            onChange={({ target }) => setDate(target.value)}
            type='date'
            id='date'
          />
        </div>
        <div className='form-group'>
          <span style={{ marginInlineEnd: '20px' }}>Visibility</span>
          <label htmlFor='visibility-great'>great</label>
          <input
            value={visibility}
            onChange={() => setVisibility('great')}
            type='radio'
            id='visibility-great'
            name='visibility'
          />
          <label htmlFor='visibility-good'>good</label>
          <input
            value={visibility}
            onChange={() => setVisibility('good')}
            type='radio'
            id='visibility-good'
            name='visibility'
          />
          <label htmlFor='visibility-ok'>ok</label>
          <input
            value={visibility}
            onChange={() => setVisibility('ok')}
            type='radio'
            id='visibility-ok'
            name='visibility'
          />
          <label htmlFor='visibility-poor'>poor</label>
          <input
            value={visibility}
            onChange={() => setVisibility('poor')}
            type='radio'
            id='visibility-poor'
            name='visibility'
          />
        </div>
        <div className='form-group'>
          <span style={{ marginInlineEnd: '20px' }}>Weather</span>
          <label htmlFor='weather-sunny'>sunny</label>
          <input
            value={weather}
            onChange={() => setWeather('sunny')}
            type='radio'
            id='weather-sunny'
            name='weather'
          />
          <label htmlFor='weather-rainy'>rainy</label>
          <input
            value={weather}
            onChange={() => setWeather('rainy')}
            type='radio'
            id='weather-rainy'
            name='weather'
          />
          <label htmlFor='weather-cloudy'>cloudy</label>
          <input
            value={weather}
            onChange={() => setWeather('cloudy')}
            type='radio'
            id='weather-cloudy'
            name='weather'
          />
          <label htmlFor='weather-stormy'>stormy</label>
          <input
            value={weather}
            onChange={() => setWeather('stormy')}
            type='radio'
            id='weather-stormy'
            name='weather'
          />
          <label htmlFor='weather-windy'>windy</label>
          <input
            value={weather}
            onChange={() => setWeather('windy')}
            type='radio'
            id='weather-windy'
            name='weather'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='comment'>Comment </label>
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            type='text'
            id='comment'
          />
        </div>
        <button type='submit'>add</button>
      </form>
      <h1>Diary entries</h1>
      {diaries.map((d) => {
        return (
          <div key={d.id}>
            <p>
              <strong>{d.date}</strong>
            </p>
            <div>visibility: {d.visibility}</div>
            <div>weather: {d.weather}</div>
          </div>
        )
      })}
    </div>
  )
}

export default App
