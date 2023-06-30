import React from 'react'

import WeatherBox from './WeatherBox'

import { WeatherType } from '../Utils/types'

const Answer = ({ loading, locationEnabled, today }: { loading: boolean, locationEnabled: boolean, today?: WeatherType }) => (
  <div className="answer">
    <div>
      <h1>Yes!</h1>
      {!loading && today && <WeatherBox {...today} loading={loading} locationEnabled={locationEnabled} />}
    </div>
  </div>
)

export default Answer
