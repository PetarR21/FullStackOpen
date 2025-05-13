/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect } from 'vitest'
import Blog from './Blog'

describe('Blog', () => {
  const blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'https://example.com',
    likes: 0,
    user: {
      name: 'Test user',
    },
  }

  test('renders only title and author by default', () => {
    const { container } = render(<Blog blog={blog} />)

    const visibleByDefault = container.querySelector('.visibleByDefault')
    const hiddenByDefault = container.querySelector('.hiddenByDefault')

    expect(visibleByDefault).toHaveTextContent('Test title Test author', {
      exact: false,
    })

    expect(hiddenByDefault).toHaveStyle('display: none')
  })

  // eslint-disable-next-line quotes
  test(" blog's URL and number of likes are shown when the view button is clicked", async () => {
    const { container } = render(<Blog blog={blog} />)

    const hiddenByDefault = container.querySelector('.hiddenByDefault')
    const viewButton = container.querySelector('.viewButton')

    const user = userEvent.setup()
    await user.click(viewButton)

    expect(hiddenByDefault).not.toHaveStyle('display: none')
  })

  test('if the like button is clicked twice, the event handle is called twice', async () => {
    const mockHandler = vi.fn()

    const { container } = render(<Blog blog={blog} updateLikes={mockHandler} />)

    const viewButton = container.querySelector('.viewButton')
    const likeButton = container.querySelector('.likeButton')

    const user = userEvent.setup()

    await user.click(viewButton)

    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
