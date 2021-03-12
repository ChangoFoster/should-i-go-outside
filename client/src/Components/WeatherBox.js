import React from 'react'
import { imgUrl } from '../Utils/consts'

import Recommendation from './Recommendation'

const WeatherBox = (day) => {
    if (!day) {
        return null
    }

    return (
        <div className="weatherBox">
            <h3>
                {day.applicable_date}
            </h3>
            <Recommendation {...day} />
            <img 
                src={`${imgUrl}/${day.weather_state_abbr}.svg`} 
                alt={day.weather_state_name} 
            />
            <p>
                {day.weather_state_name} {Math.round(day.the_temp)}&ordm;C
            </p>
            <p>
                {Math.round(day.wind_speed)} mph winds
            </p>
        </div>
    )
}

export default WeatherBox