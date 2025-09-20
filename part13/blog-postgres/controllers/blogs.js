const router = require('express').Router()

const { Blog } = require('../models')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.findAll()
    res.json(blogs)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body)
    return res.json(blog)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', blogFinder, async (req, res, next) => {
  const blog = req.blog
  if (blog) {
    blog.likes = req.body.likes
    try {
      await blog.save()
      res.json(blog)
    } catch (error) {
      next(error)
    }
  } else {
    res.sendStatus(404)
  }
})

router.delete('/:id', blogFinder, async (req, res, next) => {
  const blog = req.blog
  if (blog) {
    try {
      await blog.destroy()
      res.status(204).end()
    } catch (error) {
      next(error)
    }
  } else {
    res.sendStatus(404)
  }
})

module.exports = router
