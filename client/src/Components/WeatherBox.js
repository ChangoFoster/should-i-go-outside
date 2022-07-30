import React from 'react'
import { imgUrl } from '../Utils/consts'

import Recommendation from './Recommendation'

const WeatherBox = (day) => {
  if (!day) {
    return null
  }

  return (
    <div className="weatherBox">
      <h3>{day.date}</h3>
      <Recommendation {...day} />
      {day.type && <img src={`${imgUrl}${day.type}.png`} alt={day.type} />}
      <p>
        {day.type} {Math.round(day.temp)}&ordm;C
      </p>
      <p>{Math.round(day.wind)} mph winds</p>
    </div>
  )
}

export default WeatherBox
