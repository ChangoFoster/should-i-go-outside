import React from 'react'
import { act, render, screen } from '@testing-library/react'
import App from './App'

import { WeatherProvider } from './Utils/useWeather'

const setupNavigation = () => {
  global.navigator.geolocation = {
    getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
      Promise.resolve(
        success({
          coords: {
            latitude: 43.21,
            longitude: -87.654321,
          },
        })
      )
    ),
  }

  global.navigator.permissions = {
    query: jest.fn().mockImplementationOnce(() => Promise.resolve({ state: 'granted' })),
  }
}

describe('tests', () => {
  it('says yes', async () => {
    expect.assertions(2)

    setupNavigation()
    const promise = Promise.resolve()

    render(
      <WeatherProvider>
        <App />
      </WeatherProvider>
    )

    expect(screen.getByText('Yes!')).toBeInTheDocument()
    expect(screen.getByText('Allow location access we will tell you what its like out there')).toBeInTheDocument()
    await act(() => promise)
  })
})
