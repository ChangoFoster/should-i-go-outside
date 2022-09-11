import React, { useEffect, useState } from 'react'

import * as weatherService from './weather'
import useCurrentLocation from './useCurrentLocation'
import { WeatherType } from './types'

interface ContextState {
  today?: WeatherType
  fiveDay?: WeatherType[]
  loading: boolean
  error?: string
  locationEnabled: boolean
  getLocation: () => any
  permissionDesc: string
}

const WeatherContext = React.createContext<ContextState | null>(null)
let controller: AbortController | undefined


type WeatherProviderProps = { children: React.ReactNode }

export const WeatherProvider = ({ children }: WeatherProviderProps): JSX.Element => {
  const {
    location: currentLocation,
    locationEnabled,
    getLocation,
    permissionDesc,
  } = useCurrentLocation()
  const [loading, setLoading] = useState<boolean>(false)
  const [today, setToday] = useState<WeatherType | undefined>()
  const [fiveDay, setFiveDay] = useState<WeatherType[] | undefined>()
  const [error, setError] = useState<string | undefined>()

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
      setLoading(false)
      setToday(undefined)
      setError(undefined)
      setFiveDay(undefined)
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
    >
      {children}
    </WeatherContext.Provider>
  )
}

const useWeather = () => {
  const context = React.useContext(WeatherContext)

  if (!context) {
    throw new Error('useWeather must be used with WeatherProvider')
  }

  return context
}

export default useWeather
