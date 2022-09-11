import React from 'react'
import {
  githubProfile,
  weatherProvider,
} from '../Utils/consts'

const Footer = () => (
  <footer>
    <small>
      <p>
        Developed by{' '}
        <a href={githubProfile}>
          ChangoFoster
        </a>
        .
      </p>
      <p>
        Thanks to{' '}
        <a href={weatherProvider}>
          7timer
        </a>{' '}
        for providing an easy to use free weather API.
      </p>
    </small>
  </footer>
)

export default Footer
