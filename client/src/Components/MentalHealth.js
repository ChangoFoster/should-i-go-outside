import React from 'react'
import { mentalHealthUrl } from '../Utils/consts'

const MentalHealth = () => (
  <div className="mentalHealth">
    <p>
      Mental health is important and going for a walk can{' '}
      <a href={mentalHealthUrl} alt="mental health resource">
        help keep you mentally fit
      </a>
      .
    </p>
  </div>
)

export default MentalHealth
