import { useState } from 'react'
import '../../App.css'
import Dashboard from './Dashboard.jsx'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


function Auth() {
  const navigate = useNavigate()

  return (
    <>
      <h1>Auth</h1>
      <Button onClick={() => navigate('/dashboard')}>Dashboard</Button>
    </>
  )
}

export default Auth
