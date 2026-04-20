const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

function formatToProlog(tasks) {

}

function parsePrologOutput(output) {
    
}
const logicPath = path.join(__dirname, '../logic');
app.post('/generate', (req, res) => {
    const tasks = req.body.tasks; //React Array
    
    // 1. convert tasks to prolog string
    const prologInput = formatToProlog(tasks); 
    
    // 2. prolog query
    const query = `solve_tasks(${prologInput}, Result), writeln(Result), halt.`;
    
    exec(`swipl -s ${path.join(logicPath, 'rules.pl')} -g "${query}"`, (error, stdout, stderr) => {
        if (error) return res.status(500).json({ error: error.message });
        
        // 3. parse prolog output
        const result = parsePrologOutput(stdout);
        res.json({ schedule: result });
    });
});

app.listen(3000, () => console.log('Backend Bridge running on port 3000'));