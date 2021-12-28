import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

import { WeatherProvider } from './Utils/useWeather'

import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <WeatherProvider>
      <App />
    </WeatherProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
