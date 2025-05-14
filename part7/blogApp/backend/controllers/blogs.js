const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blogToFind = await Blog.findById(request.params.id).populate('user', {
    username: 1,
    name: 1,
  })
  if (blogToFind) {
    response.json(blogToFind)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post(
  '/',
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user

    const blog = new Blog({
      ...request.body,
      likes: request.body.likes || 0,
      user: user._id,
    })

    const savedBlog = await blog.save()

    await savedBlog.populate('user', {
      username: 1,
      name: 1,
    })

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  }
)

blogsRouter.delete(
  '/:id',
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user

    const blogToDelete = await Blog.findById(request.params.id)

    if (!blogToDelete) {
      response.status(404).end()
    }

    if (user._id.toString() !== blogToDelete.user.toString()) {
      return response
        .status(401)
        .json({ error: 'Unauthorized delete operation' })
    }

    const deletedBlog = await blogToDelete.deleteOne()
    console.log(deletedBlog)
    response.status(204).end()
  }
)

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlogObject = request.body
  const id = request.params.id

  const updatedBlog = await Blog.findByIdAndUpdate(id, updatedBlogObject, {
    new: true,
    runValidators: true,
  })

  if (updatedBlog) {
    await updatedBlog.populate('user', {
      username: 1,
      name: 1,
    })
    response.json(updatedBlog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/:id/comments', async (request, response) => {
  console.log(request.body)
  const comment = request.body.comment
  const id = request.params.id

  const blog = await Blog.findById(id)

  blog.comments = [...blog.comments, comment]
  const savedBlog = await blog.save()

  response.json(savedBlog)
})

module.exports = blogsRouter
