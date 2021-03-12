import { useEffect, useState } from 'react'
import axios from 'axios'
import useCurrentLocation from './useCurrentLocation'

const useWeather = () => {
    const { location: currentLocation } = useCurrentLocation()
    const [today, setToday] = useState()
    const [fiveDay, setFiveDay] = useState()

    useEffect(() => {
        if (currentLocation) {
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
        }
      }, [currentLocation])

      return { today, fiveDay }
}

export default useWeather
