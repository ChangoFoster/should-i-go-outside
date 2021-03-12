import React from 'react'
import './App.css'

import Answer from './Components/Answer'
import FiveDay from './Components/FiveDay'
import Footer from './Components/Footer'
import MentalHealth from './Components/MentalHealth'

function App() {
  return (
    <div className={`App theme_${Math.floor(Math.random() * 4) + 1}`}>
      <main>
        <Answer />
        <MentalHealth />
        <FiveDay />
      </main>
      <Footer />      
    </div>
  )
}

export default App
