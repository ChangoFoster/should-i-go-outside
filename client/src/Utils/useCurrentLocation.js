import { useState, useEffect, useMemo, useCallback } from 'react'

const useCurrentLocation = () => {
  const [error, setError] = useState()
  const [location, setLocation] = useState()
  const [locationEnabled, setLocationEnabled] = useState(false)
  const [permissionDesc, setPermissionDesc] = useState('denied')

  const options = useMemo(() => ({
    enableHighAccuracy: false,
    timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
    maximumAge: 1000 * 3600 * 24, // 24 hour
  }), [])

  const handleSuccess = useCallback((position) => {
    if (position?.coords) {
      const { latitude, longitude } = position.coords
      setLocation({ latitude, longitude })
    }
  }, [])

  const handleError = useCallback((error) => {
    setError(error?.message)
  }, [])

  const handleUpdateLocation = useCallback((state) => {
    setLocationEnabled(state === 'granted' ? true : false)
    setPermissionDesc(state)
  }, [])

  const getLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      options
    )
  }, [handleError, handleSuccess, options])

  useEffect(() => {
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      handleUpdateLocation(result?.state)
      result.onchange = () => {
        handleUpdateLocation(result?.state)
      }
    })

    return () => {
      setLocationEnabled(false)
      setPermissionDesc('denied')
    }
  }, [handleUpdateLocation])

  useEffect(() => {
    if (locationEnabled) getLocation()
  }, [locationEnabled, getLocation])

  return {
    error,
    getLocation,
    location,
    locationEnabled,
    permissionDesc,
  }
}

export default useCurrentLocation
