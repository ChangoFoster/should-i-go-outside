import { useState, useEffect } from 'react'

const useCurrentLocation = () => {
  const [location, setLocation] = useState()
  const [error, setError] = useState()
  const [locationEnabled, setLocationEnabled] = useState(false)
  const [permissionDesc, setPermissionDesc] = useState('denied')

  const handleSuccess = (position) => {
    const { latitude, longitude } = position.coords

    setLocation({ latitude, longitude })
  }

  const handleError = (error) => {
    setError(error.message)
  }

  const handleUpdateLocation = (state) => {
    setLocationEnabled(state === 'granted' ? true : false)
    setPermissionDesc(state)
  }

  const getLocation = () => {
    const { geolocation } = navigator

    geolocation.getCurrentPosition(handleSuccess, handleError, {
      enableHighAccuracy: false,
      timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
      maximumAge: 1000 * 3600 * 24, // 24 hour
    })
  }

  useEffect(() => {
    navigator.permissions.query({ name: 'geolocation' })
      .then((result) => {
        handleUpdateLocation(result.state)
        result.onchange = () => {
          setLocationEnabled(result.state === 'granted' ? true : false)
          setPermissionDesc(result.state)
        }
      })
  }, [])

  useEffect(() => {
    if (locationEnabled) {
      navigator.geolocation.getCurrentPosition(
        handleSuccess,
        handleError,
        {
          enableHighAccuracy: false,
          timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
          maximumAge: 1000 * 3600 * 24, // 24 hour
        }
      )
    }
  }, [locationEnabled])

  return { location, error, locationEnabled, getLocation, permissionDesc }
}

export default useCurrentLocation


