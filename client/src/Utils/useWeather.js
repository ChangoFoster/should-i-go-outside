import React, { useEffect, useState } from 'react'

import * as weatherService from './weather'
import useCurrentLocation from './useCurrentLocation'

const WeatherContext = React.createContext()
let controller

export const WeatherProvider = (props) => {
  const {
    location: currentLocation,
    locationEnabled,
    getLocation,
    permissionDesc,
  } = useCurrentLocation()
  const [loading, setLoading] = useState()
  const [today, setToday] = useState()
  const [fiveDay, setFiveDay] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    if (!currentLocation) {
      return
    }

    if (controller) {
      controller.abort()
      return
    }

    const fetchWeather = async () => {
      controller = new AbortController()
      const signal = controller.signal

      try {
        setLoading(true)
        const weather = await weatherService.getWeather(currentLocation, signal)
        console.log(weather)
        setToday(weather[0])
        setFiveDay(weather)
        setLoading(false)
      } catch (error) {
        setError(String(error))
        setLoading(false)
      }
    }

    fetchWeather()

    return () => {
      setLoading()
      setToday()
      setError()
      setFiveDay()
    }
  }, [currentLocation])

  return (
    <WeatherContext.Provider
      value={{
        today,
        fiveDay,
        loading,
        error,
        locationEnabled,
        getLocation,
        permissionDesc,
      }}
      {...props}
    />
  )
}

const useWeather = () => {
  const context = React.useContext(WeatherContext)

  if (context === undefined) {
    throw new Error('useWeather must be used with WeatherProvider')
  }

  return context
}

export default useWeather
