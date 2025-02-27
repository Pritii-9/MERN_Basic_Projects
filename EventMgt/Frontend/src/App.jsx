import React from 'react'
import "./App.css"
import {BrowserRouter as Router} from "react-router-dom"
import {Toaster} from "react-hot-toast"
import Navbar from "./components/Navbar"
import Services from "./components/Services"
import About from "./components/About"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import HeroSection from './components/HeroSection'

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Services/>
      <HeroSection/>
      <About/>
      <Contact/>
      <Footer/>
      <Toaster/>
    </Router>
  )
}

export default App
