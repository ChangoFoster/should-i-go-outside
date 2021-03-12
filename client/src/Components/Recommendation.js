import React from 'react';

const Recommendation = ({ the_temp, weather_state_abbr, wind_speed }) => {
    if (!the_temp || !weather_state_abbr || !wind_speed) {
        return (
            <div className="recommendation">
                Allow location access we'll tell you what it's like out there
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
