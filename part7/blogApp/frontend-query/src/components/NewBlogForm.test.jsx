/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'
import userEvent from '@testing-library/user-event'
import { describe, expect } from 'vitest'

describe('NewBlogForm', () => {
  test('form calls the event handler with the right details', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    const { container } = render(<NewBlogForm createBlog={createBlog} />)

    const titleInput = container.querySelector('#title')
    const authorInput = container.querySelector('#author')
    const urlInput = container.querySelector('#url')

    const sendButton = screen.getByText('create')

    await user.type(titleInput, 'test title')
    await user.type(authorInput, 'test author')
    await user.type(urlInput, 'https://example.com')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('test title')
    expect(createBlog.mock.calls[0][0].author).toBe('test author')
    expect(createBlog.mock.calls[0][0].url).toBe('https://example.com')
  })
})
