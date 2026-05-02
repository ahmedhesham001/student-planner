const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

function formatToProlog(tasks) {
    const formatted = tasks.map(t => {
        const name = t.name.toLowerCase().replace(/\s/g, '')
        return `task(${name}, ${t.difficulty}, ${t.deadline}, ${t.hours})`
    }).join(', ')
    return `[${formatted}]`
}

function parsePrologOutput(output) {
    try{
        const cleanOutput = output.trim();
        let jsonString = cleanOutput.replace(/([a-z_]+)/g, '"$1"')
                                    .replace(/'/g,'"');
        const rawArray = JSON.parse(jsonString)
        return rawArray.map(item => ({
                subject: item[0].charAt(0).toUpperCase() + item[0].slice(1), 
                duration: parseInt(item[1])
            }));
    }catch(e){
        console.error("Prolog Parsing Error:", e);
        return [];
    }
    
}
const logicPath = path.join(__dirname, '../logic');
app.post('/generate', (req, res) => {
    const tasks = req.body.tasks; 
    
    // convert tasks to prolog string
    const prologInput = formatToProlog(tasks); 
    
    // prolog query
    const query = `generate_day(${prologInput}, Result), writeln(Result), halt.`;
    console.log(`TEST THIS: swipl -s "${path.join(logicPath, 'rules.pl')}" -g "${query}"`);
    
    exec(`swipl -s "${path.join(logicPath, 'rules.pl')}" -g "${query}"`, (error, stdout, stderr) => {
        if (error){ 
            console.error("Prolog Execution Error:");
            console.error(stderr);
            console.error(error.message);

            return res.status(500).json({ error: error.message, details: stderr });
        }
        console.log("Prolog Raw Output:", stdout);

        // parse prolog output
        const result = parsePrologOutput(stdout);
        res.json({ schedule: result });
    });
});

app.listen(3000, () => console.log('Backend Bridge running on port 3000'));