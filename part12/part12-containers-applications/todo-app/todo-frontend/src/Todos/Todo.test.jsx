/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import Todo from './Todo'

test('renders content', () => {
  const todo = {
    _id: 1,
    text: 'Testing code',
    done: false,
  }

  render(
    <Todo todo={todo} onClickComplete={() => {}} onClickDelete={() => {}} />
  )

  const element = screen.getByText('Testing code')
  expect(element).toBeDefined()
})
