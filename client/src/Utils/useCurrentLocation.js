import { useState, useEffect } from "react"

const useCurrentLocation = () => {
  const [location, setLocation] = useState()
  const [error, setError] = useState()

  const handleSuccess = (position) => {
    const { latitude, longitude } = position.coords

    setLocation({ latitude, longitude })
  }

  const handleError = (error) => {
    setError(error.message)
  }

  useEffect(() => {
    const { geolocation } = navigator

    if (!geolocation) {
      setError("Geolocation is not supported.")
      return
    }

    geolocation.getCurrentPosition(
        handleSuccess, 
        handleError, 
        {
            enableHighAccuracy: true,
            timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
            maximumAge: 1000 * 3600 * 24, // 24 hour
        }
    )
  }, [])

  return { location, error }
}

export default useCurrentLocation
