import React from "react"
import Signup from "./pages/signup"
import Home from "./pages/Home"
import Login from "./pages/Login"
import {BrowserRouter , Routes , Route} from 'react-router-dom'

function App() {

  return (
    <>
     <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/register" element={<Signup/>} ></Route>
        <Route path="/login" element={<Login/>} ></Route>

      </Routes>
      </BrowserRouter>
     </div>
    </>
  )
}

export default App
