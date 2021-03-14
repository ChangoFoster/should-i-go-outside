import React from 'react'

import useWeather from '../Utils/useWeather'

import Recommendation from './Recommendation'

const Answer = () => {
  const { today } = useWeather()

  return (
    <div className="answer">
      <h1>Yes!</h1>
      <Recommendation {...today} />
    </div>
  )
}

export default Answer
