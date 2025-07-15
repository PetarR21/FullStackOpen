/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import Todo from './Todo'

test('renders todo text', () => {
  const todo = {
    _id: '1',
    text: 'Test Todo',
    done: false,
  }

  render(
    <Todo todo={todo} onClickDelete={() => {}} onClickComplete={() => {}} />
  )

  const element = screen.getByText('Test Todo')
  expect(element).toBeDefined()
})
