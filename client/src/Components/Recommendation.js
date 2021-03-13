import React from 'react'
import propTypes from 'prop-types'

import useWeather from '../Utils/useWeather'

const Recommendation = ({ temp, type, wind }) => {
    const { locationEnabled } = useWeather()

    if (!temp || !type || !wind || !locationEnabled) {
        return (
            <div className="recommendation">
                <p>Allow location access we will tell you what its like out there</p>
            </div>
        )
    }

    return (
        <div className="recommendation">
            <ul>
                {type !== ('c' || 'hc' || 'lc') && <li>Wear a coat</li>}
                {temp > 18 && <li>Consider some shorts, sunglasses and sunscreen</li>}
                {temp < 10 && <li>Wrap up warm</li>}
                {wind > 8 && <li>Avoid a hat or an umbrella</li>}
            </ul>
        </div>
    )
}

Recommendation.propTypes = {
    temp: propTypes.number,
    type: propTypes.string,
    wind: propTypes.number
}

export default Recommendation
