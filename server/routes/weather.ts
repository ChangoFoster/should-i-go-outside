import express from 'express'
import axios from 'axios'
import { weatherUrl } from '../utils/consts'

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

export default router
