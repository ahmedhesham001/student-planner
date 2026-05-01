import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Auth from './components/ui/Auth.jsx'
import Dashboard from './components/ui/Dashboard.jsx'
import Chart from './components/ui/Chart.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chart" element={<Chart />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
