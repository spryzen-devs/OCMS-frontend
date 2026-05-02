import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Register from './Pages/Register/Register.jsx'
import Login from './Pages/Login/Login.jsx'
import AdminD from './Pages/AdminDashboard/AdminD.jsx'
import StudentA from './Pages/StudentDashboard/StudentA.jsx'
import Enrollement from './Pages/Enrollement/Enrollement.jsx'
function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/admin" element={<AdminD/>} />
          <Route path="/student" element={<StudentA/>} />
          <Route path="/enrollement/:id" element={<Enrollement/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
