import express from 'express'

const router = express.Router()

/* GET home page. */
router.get('/ping', function (_req, res) {
  res.send('hello')
})

export default router
