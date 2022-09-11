import React from 'react'
import { mentalHealthUrl } from '../Utils/consts'

const MentalHealth = () => (
  <div className="mentalHealth">
    <p>
      Mental health is important and going for a walk can{' '}
      <a href={mentalHealthUrl}>
        help keep you mentally fit
      </a>
      . Stick to your local COVID rules. We will get through this.
    </p>
  </div>
)

export default MentalHealth
