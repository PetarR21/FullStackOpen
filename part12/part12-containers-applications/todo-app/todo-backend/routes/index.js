const express = require('express')
const router = express.Router()
const redis = require('redis')

const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits,
  })
})

router.get('/test', (req, res) => {
  res.json('tested')
})

module.exports = router
