import React from 'react'

import WeatherBox from './WeatherBox'
import { WeatherType } from '../Utils/types'

const FiveDay = ({ fiveDay, loading, locationEnabled }: { fiveDay?: WeatherType[], locationEnabled: boolean, loading: boolean }) => {
  if (!fiveDay || !locationEnabled) {
    return null
  }

  return (
    <div className="fiveDayWrapper">
      <h2>Should I go for a walk this week?</h2>
      <div className="fiveDay">
        {fiveDay.map((day) => (
          <WeatherBox {...day} loading={loading} locationEnabled={locationEnabled} key={day.date} />
        ))}
      </div>
    </div>
  )
}

export default FiveDay
