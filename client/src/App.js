import React, { Suspense } from 'react'
import './App.css'

import Answer from './Components/Answer'
import Footer from './Components/Footer'
import LocationButton from './Components/LocationButton'
import MentalHealth from './Components/MentalHealth'

const FiveDay = React.lazy(() => import('./Components/FiveDay'))

function App() {
  return (
    <div className={`App theme_${Math.floor(Math.random() * 5) + 1}`}>
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
  )
}

export default App
