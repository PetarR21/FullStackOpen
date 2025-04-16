const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const reducer = (accumulator, currentValue) => {
    return accumulator.likes >= currentValue.likes ? accumulator : currentValue
  }

  return blogs.reduce(reducer, blogs[0])
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authorBlogCounts = _.countBy(blogs, 'author')
  const authorWithMostBlogs = _.maxBy(
    Object.keys(authorBlogCounts),
    (author) => authorBlogCounts[author]
  )

  return {
    author: authorWithMostBlogs,
    blogs: authorBlogCounts[authorWithMostBlogs],
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const likesByAuthor = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes
    return acc
  }, {})

  const authorWithMostLikes = _.maxBy(
    Object.keys(likesByAuthor),
    (author) => likesByAuthor[author]
  )

  return {
    author: authorWithMostLikes,
    likes: likesByAuthor[authorWithMostLikes],
  }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
}
