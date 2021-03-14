import React from 'react'
import {
  geolocationHook,
  githubProfile,
  weatherProvider,
} from '../Utils/consts'

const Footer = () => (
  <footer>
    <small>
      <p>
        Developed by{' '}
        <a href={githubProfile} alt="Developer github page">
          ChangoFoster
        </a>
        .
      </p>
      <p>
        Thanks to{' '}
        <a href={weatherProvider} alt="Weather API provider">
          Meta Weather
        </a>{' '}
        for providing an easy to use free weather API.
      </p>
      <p>
        Thanks to{' '}
        <a href={geolocationHook} alt="Geolocation hook guide">
          NorbertB29
        </a>{' '}
        for creating a great guide to using geolocation data.
      </p>
    </small>
  </footer>
)

export default Footer
