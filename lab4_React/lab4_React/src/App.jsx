import { useState } from 'react'
import './App.css'
import GiphyCarousel from './GiphyCarousel.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <GiphyCarousel/>
    </>
  )
}

export default App
