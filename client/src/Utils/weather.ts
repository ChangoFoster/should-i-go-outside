import axios from 'axios'

const isString = (text: unknown) => {
  return typeof text === 'string' || text instanceof String
}

const getWeather = async (
  location: { latitude: number; longitude: number },
  signal: AbortSignal
) => {
  if (!location) {
    throw new Error(`No location set: ${location}`)
  }

  const { latitude, longitude } = location

  const options = {
    signal,
    params: {
      lat: Math.round(latitude),
      lon: Math.round(longitude),
    },
  }

  const { data } = await axios.get('/weather/', options)
  return toWeatherArray(data.dataseries)
}

const toWeatherArray = (weatherArray: unknown[]) => {
  if (!Array.isArray(weatherArray)) {
    throw new Error(`Weather is not an array: ${String(weatherArray)}`)
  }

  return weatherArray.map((weather) => toWeather(weather))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toWeather = (object: any) => {
  if (!object) {
    throw new Error(`Weather missing key attributes: ${String(object)}`)
  }

  const weather = {
    date: parseDate(object?.date),
    type: parseType(object?.weather),
    temp: parseTemp(object?.temp2m?.max),
    wind: parseWind(object?.wind10m_max),
  }

  return weather
}

const parseDate = (date: unknown) => {
  // Add additional date checks here
  if (!date) {
    throw new Error(`Incorrect or missing date: ${String(date)}`)
  }

  const dateString = String(date)
  const year = dateString.slice(0, 4)
  const month = dateString.slice(4, 6)
  const day = dateString.slice(6, 8)

  return new Date(`${year}-${month}-${day}`).toDateString()
}

const getType = (type: string) => {
  switch (type) {
    case 'lightrain':
      return 'rain'
    default:
      return type
  }
}

const parseType = (type: unknown) => {
  if (!type || !isString(type)) {
    throw new Error(`Incorrect or missing type: ${String(type)}`)
  }

  return getType(type as string)
}

const parseTemp = (temp: unknown) => {
  if (!temp || Number.isNaN(Number(temp))) {
    throw new Error(`Incorrect or missing temo: ${String(temp)}`)
  }

  return Number(temp)
}

const parseWind = (wind: unknown) => {
  if (!wind || Number.isNaN(Number(wind))) {
    throw new Error(`Incorrect or missing wind: ${Number(wind)}`)
  }

  return Number(wind)
}

export { getWeather }
