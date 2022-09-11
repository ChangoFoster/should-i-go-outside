import React from 'react'

import useWeather from '../Utils/useWeather'

import WeatherBox from './WeatherBox'

const Answer = () => {
  const { loading, today } = useWeather()

  return (
    <div className="answer">
      <div>
        <h1>Yes!</h1>
        {!loading && today && <WeatherBox {...today} />}
      </div>
    </div>
  )
}

export default Answer
