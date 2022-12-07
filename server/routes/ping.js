const express = require('express')

const router = express.Router()

/* GET home page. */
router.get('/ping', function(_req, res) {
  res.send('hello')
})

module.exports = router
