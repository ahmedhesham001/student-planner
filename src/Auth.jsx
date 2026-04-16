import { useState } from 'react'
import './App.css'
import Dashboard from './Dashboard'
import { useNavigate } from 'react-router-dom'
function Auth() {
  const navigate = useNavigate()

  return (
    <>
      <h1>Auth</h1>
      <button onClick={() => navigate('/dashboard')}>Dashboard</button>
    </>
  )
}

export default Auth
