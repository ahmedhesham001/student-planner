import { useState } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function Dashboard() {
    const navigate = useNavigate()
    return (
        <>
            <h1>Dashboard</h1>
            <Button onClick={() => navigate('/auth')}>Auth</Button>
            <Input type="text" placeholder="shadcn" />
        </>
    )
}

export default Dashboard