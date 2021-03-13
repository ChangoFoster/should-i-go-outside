import axios from 'axios'

const getWeather = async (location) => {
    if (!location) {
        throw new Error(`No location set: ${location}`)
    }

    const  {latitude, longitude} = location
    
    const options = {
        params: {
            latt: Math.round(latitude),
            long: Math.round(longitude)  
        }
    }

    const { data } =  await axios.get('/weather/', options)
    return toWeatherArray(data.consolidated_weather)
}

const toWeatherArray = (weatherArray) => {
    if (!Array.isArray(weatherArray)) {
        throw new Error(`Weather is not an array: ${weatherArray}`)
    }

    return weatherArray.map(weather => toWeather(weather))
}

const toWeather = (object) => {
    if (
        !object.id 
        || object.applicable_date 
        || !object.weather_state_abbr 
        || !object.weather_state_name 
        || !object.the_temp 
        || !object.wind_speed
    ) {
        throw new Error(`Weather missing key attributes: ${weather}`)
    }

    const weather = {
        id: object.id,
        date: object.applicable_date,
        name: object.weather_state_name,
        type: object.weather_state_abbr,
        temp: object.the_temp,
        wind: object.wind_speed
    }

    return weather
}

export { getWeather }
