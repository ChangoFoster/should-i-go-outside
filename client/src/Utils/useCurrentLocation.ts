import { useState, useMemo, useCallback, useEffect } from 'react'

const useCurrentLocation = () => {
  const [error, setError] = useState<string | undefined>()
  const [location, setLocation] = useState<
    { latitude: number; longitude: number } | undefined
  >()
  const [locationEnabled, setLocationEnabled] = useState(false)
  const [permissionDesc, setPermissionDesc] = useState<string | undefined>(
    undefined
  )

  const options = useMemo(
    () => ({
      enableHighAccuracy: false,
      timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
      maximumAge: 1000 * 3600 * 24, // 24 hour
    }),
    []
  )

  const handleSuccess = useCallback((position: GeolocationPosition) => {
    if (position?.coords) {
      const { latitude, longitude } = position.coords
      setLocation({ latitude, longitude })
      setLocationEnabled(true)
    }
  }, [])

  const handleError = useCallback((error: GeolocationPositionError) => {
    setError(error?.message)
    if (error.code === 1) {
      setPermissionDesc('denied')
      setLocationEnabled(false)
      setLocation(undefined)
    }
  }, [])

  const handleUpdateLocation = useCallback(
    (state: PermissionStatus['state']) => {
      const hasPermission = state === 'granted'
      const hasTemporaryPermission =
        !!location && state === 'prompt' && permissionDesc !== 'denied'

      setLocationEnabled(hasPermission || hasTemporaryPermission ? true : false)
    },
    [location, permissionDesc]
  )

  const getLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      options
    )
  }, [handleError, handleSuccess, options])

  useEffect(() => {
    const getPermissions = async () => {
      const permissions = await navigator.permissions.query({
        name: 'geolocation',
      })

      if (permissions?.state !== permissionDesc) {
        handleUpdateLocation(permissions?.state)
      }

      if (!permissionDesc) {
        setPermissionDesc(permissions?.state)
      }
    }

    getPermissions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleUpdateLocation])

  useEffect(() => {
    if (permissionDesc === 'granted') {
      getLocation()
    }
  }, [getLocation, permissionDesc])

  return {
    error,
    getLocation,
    location,
    locationEnabled,
    permissionDesc,
  }
}

export default useCurrentLocation
