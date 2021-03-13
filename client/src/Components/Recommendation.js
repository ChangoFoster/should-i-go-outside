import React from 'react';
import propTypes from 'prop-types'

Recommendation.propTypes = {
    the_temp: propTypes.number,
    weather_state_abbr: propTypes.string,
    wind_speed: propTypes.number
}

const Recommendation = ({ the_temp, weather_state_abbr, wind_speed }) => {
    if (!the_temp || !weather_state_abbr || !wind_speed) {
        return (
            <div className="recommendation">
                Allow location access we will tell you what its like out there
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

export default Recommendation
