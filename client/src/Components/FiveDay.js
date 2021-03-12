import React from 'react'

import useWeather from '../Utils/useWeather'

import WeatherBox from './WeatherBox'

const FiveDay = () => {
    const { fiveDay } = useWeather()

    if (!fiveDay) {
        return null
    }
    return (
        <div className="fiveDayWrapper">
            <h2>
                Should I go for a walk this week?
            </h2>
            <div className="fiveDay">
                {fiveDay.map(day => <WeatherBox {...day} key={day.id} />)}
            </div>
        </div>
    )
}

export default FiveDay
