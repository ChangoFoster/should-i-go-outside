import React from 'react'
import propTypes from 'prop-types'


type RecommendationProps = {
  loading: boolean;
  locationEnabled: boolean;
  temp: number;
  type: string;
  wind: number;
}

const Recommendation = ({ loading, locationEnabled, temp, type, wind }: RecommendationProps) => {
  if (loading) {
    return (
      <div className="recommendaton">
        <p>Loading weather...</p>
      </div>
    )
  }

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
        {!['clear', 'cloudy', 'pcloudy'].includes(type) && <li>Wear a coat</li>}
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
  wind: propTypes.number,
}

export default Recommendation
