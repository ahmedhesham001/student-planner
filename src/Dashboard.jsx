import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function Dashboard() {
    const navigate = useNavigate()
    const [subject,setSubject]=useState(
        {
            name:"",
            difficulty:"",
            deadline:"",
            hours:""
        }
    )
    const change=(e)=>{
        setSubject(
            {
                ...subject,[e.target.name]:e.target.value
            }
        )
    }
    const [subjectsList, setSubjectsList] = useState([]);
    const AddSubject = () => {
    setSubjectsList([...subjectsList, subject]);

    setSubject({
    name: "",
    difficulty: "",
    deadline: "",
    hours: ""
    
    });
};
useEffect(() => {console.log(subjectsList)},[subjectsList])


    return (
        <>

<div>
<h1>Dashboard</h1>

{/*****************subject*****************/}
<form>
<Input name="name"
placeholder="Subject Name"
value={subject.name}
onChange={change}/>

{/*****************difficulty*****************/}

<Input name="difficulty"
placeholder="Difficulty"
value={subject.difficulty}
onChange={change}/>

{/*****************deadline*****************/}

<Input name="deadline"
placeholder="Deadline"
value={subject.deadline}
onChange={change}/>

{/*****************hours*****************/}

<Input name="hours"
placeholder="Hours"
value={subject.hours}
onChange={change}/>
<div>
    <Button onClick={AddSubject}>
    Add Subject
</Button>
<Button>
    Generate Schedule
</Button>
</div>
</form>
</div>
            <Button onClick={() => navigate('/auth')}>Auth</Button>
            <Input type="text" placeholder="shadcn" />
        </>
    )
}

export default Dashboard