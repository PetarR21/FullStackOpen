const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blogToFind = await Blog.findById(request.params.id)
  if (blogToFind) {
    response.json(blogToFind)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const blogObject = {
    ...request.body,
    likes: request.body.likes || 0,
  }
  const newBlog = new Blog(blogObject)

  const savedBlog = await newBlog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
  if (deletedBlog) {
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlogObject = request.body
  const id = request.params.id

  const updatedBlog = await Blog.findByIdAndUpdate(id, updatedBlogObject, {
    new: true,
    runValidators: true,
  })

  if (updatedBlog) {
    response.json(updatedBlog)
  } else {
    response.status(404).end()
  }
})

module.exports = blogsRouter
