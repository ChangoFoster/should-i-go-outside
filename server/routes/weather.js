const express = require('express');
const router = express.Router();
const axios = require('axios');
const { weatherUrl } = require('../utils/consts')

router.get('/',  async (req, res, next) => {
  const { latt, long } = req.query

  console.log('ding')
  
  if (!latt || !long) {
    res.status(400).send(`Missing lattlong: ${JSON.stringify(req.query)}`)
  }
  
  try {
    const locations = await axios.get(`${weatherUrl}/search/?lattlong=${latt},${long}`)
    const weather = await axios.get(`${weatherUrl}/${locations.data[0].woeid}`)
    res.send(weather.data)
  } catch (error) {
    res.status(404).send(`Something went wrong: ${JSON.stringify(error)}`)
  }
})

module.exports = router;
