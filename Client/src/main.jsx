import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Auth from './Auth.jsx'
import Dashboard from './Dashboard.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
