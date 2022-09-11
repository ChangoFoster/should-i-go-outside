import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'

import { WeatherProvider } from './Utils/useWeather'

import './index.css'

const container = document.getElementById('root')

if (!container) {
  throw new Error('unable to find root element')
}

const root = createRoot(container)

root.render(
  <React.StrictMode>
    <WeatherProvider>
      <App />
    </WeatherProvider>
  </React.StrictMode>
)
