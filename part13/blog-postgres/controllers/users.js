const router = require('express').Router()

const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] },
    },
  })
  res.json(users)
})

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    res.json(user)
  } else {
    res.sendStatus(404)
  }
})

router.put('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    if (req.body.username) {
      user.username = req.body.username
      try {
        await user.save()
        res.json(user)
      } catch (error) {
        res.status(400).json(error)
      }
    } else {
      res.sendStatus(400)
    }
  } else {
    res.sendStatus(404)
  }
})

module.exports = router
