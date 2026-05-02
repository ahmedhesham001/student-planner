import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import Chart from "./Chart";
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

function Dashboard() {
    const [chartData, setChartData] = useState(null);
    const renderChart = (schedule) => {
    const MAX_HOURS = 8;
    const rawSubjects = schedule.map(s => s.subject);
    const uniqueSubjects = [...new Set(rawSubjects)];

    const datasets = uniqueSubjects.map((subject, index) => {
        const subjectSessions = []; 
        let hoursTracked = 0;

        schedule.forEach((session) => {
            if (hoursTracked >= MAX_HOURS) return; 

            const start = hoursTracked;
            const duration = Math.min(session.duration, MAX_HOURS - hoursTracked);
            const end = start + duration;

            if (session.subject === subject && duration > 0) {
                subjectSessions.push({
                    y: subject,
                    x: [start, end]
                });
            }
            hoursTracked += duration;
        });

        return {
            label: subject,
            data: subjectSessions,
            backgroundColor: `hsla(${index * (360 / uniqueSubjects.length)}, 70%, 50%, 0.8)`,
            barPercentage: 0.6,
        };
    });

    setChartData({
        labels: uniqueSubjects,
        datasets: datasets,
    });
};
    const generateSchedule = async () => {
        if(subjectsList.length===0){
            alert("Please add subjects first");
            return;
        }
        try{
            const res = await fetch("http://localhost:3000/generate",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({tasks:subjectsList})
            });
            const data = await res.json();
            const schedule = data.schedule;
            if(schedule){
                renderChart(schedule);
            }
        }catch(error){
            console.error("Error calling backend: ",error);
            alert("Error generating schedule");
            return;
        }
    };
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
    const AddSubject = (e) => {
        e.preventDefault()
        if(subject.name===""||subject.difficulty===""||subject.deadline===""||subject.hours===""){
            alert("Please fill all the fields");
            return;
        }
        if(subject.difficulty <=0 || subject.difficulty >=10){
            alert("Difficulty must be between 1 and 10");
            return;
        }
        setSubjectsList([...subjectsList, subject]);

        setSubject({
        name: "",
        difficulty: "",
        deadline: "",
        hours: ""
    
    });
};

function handleDelete(index){
    setSubjectsList(subjectsList.filter((_, i) => i !== index));
}


    return (
        <>

            <div>
                <h1 className='text-center text-2xl font-bold'>Dashboard</h1>

                {/*****************subject*****************/}
                <form onSubmit={AddSubject} className='flex flex-col gap-6'>
                    <Input name="name"
                    type="text"
                    placeholder="Logic Programming"
                    value={subject.name}
                    onChange={change}/>

                    {/*****************difficulty*****************/}

                    <Input name="difficulty"
                    type="number"
                    placeholder="1-10"
                    min={1}
                    max={10}
                    value={subject.difficulty}
                    onChange={change}/>

                    {/*****************deadline*****************/}

                    <Input name="deadline"
                    type="number"
                    placeholder="1-30"
                    value={subject.deadline}
                    onChange={change}/>

                    {/*****************hours*****************/}

                    <Input name="hours"
                    type='number'
                    placeholder="24"
                    value={subject.hours}
                    onChange={change}/>
                    <div>
                        <Button type="submit" >
                            Add Subject
                        </Button>
                        <Button onClick={generateSchedule}>
                            Generate Schedule
                        </Button>
                        
                    </div>
                </form>
            </div>
            {
                subjectsList.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className='w-[150px] text-center'>Name</TableHead>
                            <TableHead className='w-[150px] text-center'>Difficulty</TableHead>
                            <TableHead className='w-[150px] text-center'>Deadline</TableHead>
                            <TableHead className='w-[150px] text-center'>Hours</TableHead>
                            <TableHead className='w-[150px] text-center'>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {subjectsList.map((subject, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium text-left">{subject.name}</TableCell>
                                <TableCell className='w-[150px] text-center'>{subject.difficulty}</TableCell>
                                <TableCell className='w-[150px] text-center'>{subject.deadline}</TableCell>
                                <TableCell className='w-[150px] text-center'>{subject.hours}</TableCell>
                                <TableCell className='w-[150px] text-center'>
                                <Button variant="outline" onClick={()=>handleDelete(index)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ):(
                    <p className='text-center mt-10 text-neutral-500 text-lg'>No subjects added yet</p>
                )
            }
            {chartData && <Chart data={chartData} />}
        </>
    )
}

export default Dashboard