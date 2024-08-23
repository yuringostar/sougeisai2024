import React from 'react'
import QrCodeScanner from './components/QrCodeScanner'
import Map from './components/MapPage' 
//import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom"



import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Layout from "./Layout"

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<QrCodeScanner />} />
          <Route path="/about" element={<Map />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App