import React from 'react'
import { act, render, screen } from '@testing-library/react'
import App from './App'

import { WeatherProvider } from './Utils/useWeather'

const setupNavigationSuccess = () => {
  global.navigator.geolocation = {
    getCurrentPosition: jest.fn().mockResolvedValueOnce({
      coords: {
        latitude: 43.21,
        longitude: -87.654321,
      },
    }),
  }

  global.navigator.permissions = {
    query: jest.fn().mockResolvedValueOnce({ state: 'granted' }),
  }
}

const setupNavigationFail = () => {
  global.navigator.geolocation = {
    getCurrentPosition: jest.fn().mockRejectedValueOnce(),
  }

  global.navigator.permissions = {
    query: jest.fn().mockResolvedValueOnce({ state: 'denied' }),
  }
}

const setup = () => {
  const utils = render(
    <WeatherProvider>
      <App />
    </WeatherProvider>
  )

  return { ...utils }
}

describe('tests', () => {
  it('when success, says yes', async () => {
    expect.assertions(2)

    setupNavigationSuccess()
    const promise = Promise.resolve()

    setup()

    expect(screen.getByText('Yes!')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Allow location access we will tell you what its like out there'
      )
    ).toBeInTheDocument()
    await act(() => promise)
  })

  it('when fail, says yes', async () => {
    expect.assertions(2)

    setupNavigationFail()

    setup()

    expect(screen.getByText('Yes!')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Allow location access we will tell you what its like out there'
      )
    ).toBeInTheDocument()
  })
})
