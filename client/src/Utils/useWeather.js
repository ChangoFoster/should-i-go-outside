import React, { useEffect, useState } from 'react'
import axios from 'axios'
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

        axios.get('/weather/', {
            params: {
                latt: Math.round(currentLocation.latitude),
                long: Math.round(currentLocation.longitude)  
            }
        })
            .then(response => {
                setFiveDay(response.data.consolidated_weather)
                setToday(response.data.consolidated_weather[0])
            })
            .catch(error => console.log(error))
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
