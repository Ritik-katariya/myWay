// app/color-picker.tsx
'use client'

import { useState } from 'react'

export default function ColorPicker() {
  const [color, setColor] = useState('#0070f3') // default
  const [textcolor, settextColor] = useState('#ffff') // default

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'primary') {
      setColor(value)
      document.documentElement.style.setProperty('--primary-color', value)
    } else if (name === 'text') {
      settextColor(value)
      document.documentElement.style.setProperty('--text-color', value)
    }
  }

  return (
    <div className="p-4">
      <label htmlFor="primary-color">Pick Primary Color: </label>
      <input
        id="primary-color"
        name="primary"
        type="color"
        value={color}
        onChange={handleChange}
        className="ml-2"
      />
      <label htmlFor="text-color" className="ml-4">Pick Text Color: </label>
      <input
        id="text-color"
        name="text"
        type="color"
        value={textcolor}
        onChange={handleChange}
        className="ml-2"
      />
    </div>
  )
}
