import React from 'react'
import { imgUrl } from '../Utils/consts'

import Recommendation from './Recommendation'

const WeatherBox = (day) => {
  if (!day) {
    return null
  }

  return (
    <div className="weatherBox">
      <h3>{day.applicable_date}</h3>
      <Recommendation {...day} />
      <img src={`${imgUrl}/${day.type}.svg`} alt={day.name} />
      <p>
        {day.name} {Math.round(day.temp)}&ordm;C
      </p>
      <p>{Math.round(day.wind)} mph winds</p>
    </div>
  )
}

export default WeatherBox
