import React from 'react'

import useWeather from '../Utils/useWeather'

const LocationButton = () => {
  const { locationEnabled, getLocation, permissionDesc } = useWeather()

  if (locationEnabled) {
    return null
  }

  if (permissionDesc === 'denied') {
    return <div>Location info has been blocked. Update your settings if you want to see the weather.</div>
  }

  return <button onClick={() => getLocation()}>Share location to get weather</button>
}

export default LocationButton
