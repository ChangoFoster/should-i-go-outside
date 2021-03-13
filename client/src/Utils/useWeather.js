import React, { useEffect, useState } from 'react'

import * as weatherService from './weather'
import useCurrentLocation from './useCurrentLocation'

const WeatherContext = React.createContext()

export const WeatherProvider = (props) => {
    const { location: currentLocation, locationEnabled, getLocation } = useCurrentLocation()
    const [today, setToday] = useState()
    const [fiveDay, setFiveDay] = useState()

    useEffect (() => {
        if (!currentLocation) {
            console.log('Location not enabled')
            return undefined
        }
        const fetchWeather = async () => {
            try {
                const weather = await weatherService.getWeather(currentLocation)
                setToday(weather[0])
                setFiveDay(weather)
            } catch (error) {
                console.log(error)
            }
        }

        fetchWeather()
    }, [currentLocation])

    return (
        <WeatherContext.Provider value={{ today, fiveDay, currentLocation, locationEnabled, getLocation }} {...props} />
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
