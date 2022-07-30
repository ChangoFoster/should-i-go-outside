import React from 'react'

import useWeather from '../Utils/useWeather'

import WeatherBox from './WeatherBox'

const Answer = () => {
  const { loading, today } = useWeather()

  return (
    <div className="answer">
      <h1>Yes!</h1>
      {!loading && <WeatherBox {...today} />}
    </div>
  )
}

export default Answer
