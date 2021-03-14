import axios from 'axios'

const isString = (text) => {
  return typeof text === 'string' || text instanceof String
}

const getWeather = async (location) => {
  if (!location) {
    throw new Error(`No location set: ${location}`)
  }

  const { latitude, longitude } = location

  const options = {
    params: {
      latt: Math.round(latitude),
      long: Math.round(longitude),
    },
  }

  const { data } = await axios.get('/weather/', options)
  return toWeatherArray(data.consolidated_weather)
}

const toWeatherArray = (weatherArray) => {
  if (!Array.isArray(weatherArray)) {
    throw new Error(`Weather is not an array: ${String(weatherArray)}`)
  }

  return weatherArray.map((weather) => toWeather(weather))
}

const toWeather = (object) => {
  if (!object) {
    throw new Error(`Weather missing key attributes: ${String(object)}`)
  }

  const weather = {
    id: parseId(object.id),
    date: parseDate(object.applicable_date),
    name: parseName(object.weather_state_name),
    type: parseType(object.weather_state_abbr),
    temp: parseTemp(object.the_temp),
    wind: parseWind(object.wind_speed),
  }

  return weather
}

const parseId = (id) => {
  if (!id || !Number.isInteger(id)) {
    throw new Error(`Incorrect or missing id: ${String(id)}`)
  }

  return id
}

const parseDate = (date) => {
  // Add additional date checks here
  if (!date) {
    throw new Error(`Incorrect or missing date: ${String(date)}`)
  }

  return date
}

const parseName = (name) => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${String(name)}`)
  }

  return name
}

const parseType = (type) => {
  if (!type || !isString(type)) {
    throw new Error(`Incorrect or missing type: ${String(type)}`)
  }

  return type
}

const parseTemp = (temp) => {
  if (!temp || Number.isNaN(Number(temp))) {
    throw new Error(`Incorrect or missing temo: ${String(temp)}`)
  }

  return Number(temp)
}

const parseWind = (wind) => {
  if (!wind || Number.isNaN(Number(wind))) {
    throw new Error(`Incorrect or missing wind: ${Number(wind)}`)
  }

  return Number(wind)
}

export { getWeather }
