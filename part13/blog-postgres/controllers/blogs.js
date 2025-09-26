const router = require('express').Router()
const jwt = require('jsonwebtoken')

const { Blog, User } = require('../models')
const { SECRET } = require('../util/config')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error) {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }

  next()
}

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.findAll({
      attributes: { exclude: ['userId'] },
      include: {
        model: User,
        attributes: ['name'],
      },
    })
    res.json(blogs)
  } catch (error) {
    next(error)
  }
})

router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({
      ...req.body,
      userId: user.id,
      date: new Date(),
    })
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

router.delete('/:id', tokenExtractor, blogFinder, async (req, res, next) => {
  const blog = req.blog
  if (blog) {
    if (blog.userId === req.decodedToken.id) {
      try {
        await blog.destroy()
        res.status(204).end()
      } catch (error) {
        next(error)
      }
    } else {
      return res.status(401).json({ error: 'unauthorized delete operation' })
    }
  } else {
    res.sendStatus(404)
  }
})

module.exports = router
