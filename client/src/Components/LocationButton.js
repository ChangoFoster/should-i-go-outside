import React from 'react'

import useWeather from '../Utils/useWeather'

const LocationButton = () => {
  const { locationEnabled, getLocation } = useWeather()

  if (locationEnabled) {
    return null
  }

  return <button onClick={() => getLocation()}>Enable location</button>
}

export default LocationButton
