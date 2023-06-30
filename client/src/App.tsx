import React, { Suspense, useEffect } from 'react'
import './App.css'

import Answer from './Components/Answer'
import Footer from './Components/Footer'
import LocationButton from './Components/LocationButton'
import MentalHealth from './Components/MentalHealth'

const FiveDay = React.lazy(() => import('./Components/FiveDay'))

const colors = [{
  theme: 1,
  backgroundColor: 'white',
  color: 'black',
}, {
  theme: 2,
  backgroundColor: '#238423',
  color: 'white',
},
{
  theme: 3,
  backgroundColor: 'black',
  color: 'white',
}, {
  theme: 4,
  backgroundColor: '#64319A',
  color: 'white',
}]

const App = () => {
  const theme = colors[Math.floor(Math.random() * colors.length)]

  useEffect(() => {
    document.body.style.backgroundColor = theme.backgroundColor
    document.body.style.color = theme.color
  }, [theme])

  return <div className={`App theme_${theme.theme}`}>
    <main>
      <Answer />
      <LocationButton />
      <MentalHealth />
      <Suspense fallback={null}>
        <FiveDay />
      </Suspense>
    </main>
    <Footer />
  </div>
}

export default App
