import React from 'react'
import { Card } from './Card'

export default function Project() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 '>
      {[1,2,3,4,5,6].map((index) => (
<Card key={index} />
      ))}
    </div>
  )
}
