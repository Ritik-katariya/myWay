// app/components/FontSelector.tsx
'use client'

import { useEffect, useState } from 'react'

export default function FontSelector() {
  const [font, setFont] = useState('Inter')

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFont = e.target.value
    setFont(selectedFont)

    // Load the font dynamically from Google Fonts
    const linkId = 'dynamic-google-font'
    let link = document.getElementById(linkId) as HTMLLinkElement | null

    if (!link) {
      link = document.createElement('link')
      link.id = linkId
      link.rel = 'stylesheet'
      document.head.appendChild(link)
    }

    const googleFontUrl = `https://fonts.googleapis.com/css2?family=${selectedFont.replace(/ /g, '+')}&display=swap`
    link.href = googleFontUrl

    // Update CSS variable
    document.documentElement.style.setProperty('--font-main', `'${selectedFont}', sans-serif`)
  }

  return (
    <div className="p-4">
      <label htmlFor="font">Choose a Google Font: </label>
      <select
  id="font"
  value={font}
  onChange={handleChange}
  className="ml-2 border p-1"
>
  <option value="Roboto">Roboto</option>
  <option value="Open Sans">Open&nbsp;Sans</option>
  <option value="Lato">Lato</option>
  <option value="Montserrat">Montserrat</option>
  <option value="Oswald">Oswald</option>
  <option value="Source Sans 3">Source&nbsp;Sans&nbsp;3</option>
  <option value="Slabo">Slabo</option>
  <option value="Inter">Inter</option>
  <option value="Poppins">Poppins</option>
  <option value="Alegreya">Alegreya</option>
  <option value="DM Sans">DM&nbsp;Sans</option>
  <option value="Libre Franklin">Libre&nbsp;Franklin</option>
  <option value="Fira Sans">Fira&nbsp;Sans</option>
  <option value="Cormorant">Cormorant</option>
  <option value="Work Sans">Work&nbsp;Sans</option>
  <option value="Source Serif Pro">Source&nbsp;Serif&nbsp;Pro</option>
  <option value="Playfair Display">Playfair&nbsp;Display</option>
  <option value="Spectral">Spectral</option>
  <option value="Nunito Sans">Nunito&nbsp;Sans</option>
  <option value="Rubik">Rubik</option>
</select>

    </div>
  )
}
