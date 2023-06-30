import React from 'react'
import { imgUrl } from '../Utils/consts'

import Recommendation from './Recommendation'

type WeatherBoxProps = {
  date: string;
  loading: boolean;
  locationEnabled: boolean;
  temp: number;
  type: string;
  wind: number;
}

const WeatherBox = (day: WeatherBoxProps) => {
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
