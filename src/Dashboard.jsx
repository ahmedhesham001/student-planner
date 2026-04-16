import { useState } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
    const navigate = useNavigate()

    return (
        <>
            <h1>Dashboard</h1>
            <button onClick={() => navigate('/auth')}>Auth</button>
        </>
    )
}

export default Dashboard