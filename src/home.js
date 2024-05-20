import React from 'react'
import { Route, Routes } from 'react-router-dom'
import App from './App'
import Booking from './Booking'
import Finish from './finish'
import Admin from './Admin'

const Home = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/booking" element={<Booking/>} />
      <Route path="/booking/finish" element={<Finish />} />
      <Route path="admin" element={<Admin />} />
    </Routes>
  )
}

export default Home
