import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Patients from './pages/Patients'
import Doctors from './pages/Doctors'
import Appointments from './pages/Appointments'

function App() {
  const token = localStorage.getItem('token')

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/patients" element={token ? <Patients /> : <Navigate to="/" />} />
        <Route path="/doctors" element={token ? <Doctors /> : <Navigate to="/" />} />
        <Route path="/appointments" element={token ? <Appointments /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App