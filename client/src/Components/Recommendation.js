import React from 'react'
import propTypes from 'prop-types'

import useWeather from '../Utils/useWeather'

const Recommendation = ({ the_temp, weather_state_abbr, wind_speed }) => {
    const { locationEnabled } = useWeather()

    if (!the_temp || !weather_state_abbr || !wind_speed || !locationEnabled) {
        return (
            <div className="recommendation">
                <p>Allow location access we will tell you what its like out there</p>
            </div>
        )
    }

    return (
        <div className="recommendation">
            <ul>
                {weather_state_abbr !== ('c' || 'hc' || 'lc') && <li>Wear a coat</li>}
                {the_temp > 18 && <li>Consider some shorts, sunglasses and sunscreen</li>}
                {the_temp < 10 && <li>Wrap up warm</li>}
                {wind_speed > 8 && <li>Avoid a hat or an umbrella</li>}
            </ul>
        </div>
    )
}

Recommendation.propTypes = {
    the_temp: propTypes.number,
    weather_state_abbr: propTypes.string,
    wind_speed: propTypes.number
}

export default Recommendation
