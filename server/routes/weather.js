const express = require('express')
const axios = require('axios')
const { weatherUrl } = require('../utils/consts')

const router = express.Router()

router.get('/', async (req, res) => {
  const { lat, lon } = req.query

  if (!lat || !lon) {
    res.status(400).send(`Missing lat or lon: ${JSON.stringify(req.query)}`)
  }

  try {
    const weather = await axios.get(weatherUrl, {
      params: { lon, lat, output: 'json', unit: 'metric' },
    })
    res.send(weather.data)
  } catch (error) {
    res.status(404).send(`Something went wrong: ${JSON.stringify(error)}`)
  }
})

module.exports = router
