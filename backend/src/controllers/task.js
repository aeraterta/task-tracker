const pool = require('../db');

module.exports = {
    async getList(req, res) {
        const taskList = await pool.query("SELECT * FROM tasks");
        res.status(200).send(taskList.rows);
    },
    async addTask(req, res) {
        //console.log(req.body);
        try {
            const taskCheck = await pool.query("SELECT taskname FROM tasks WHERE taskname = $1",[req.body.taskname]);
            if (taskCheck.rows.length != 0){
                res.status(409).send('Duplicate Content!');   
                console.log("Duplicate Content!"); 
            }
            else {
                const newTask = await pool.query("INSERT INTO tasks (taskname,taskdue,isdone,taskdone) VALUES ($1, $2, $3, $4) RETURNING *",[req.body.taskname, req.body.taskdue, req.body.isdone, req.body.taskdone]);
                res.status(200).send(newTask.rows[0]);
                console.log("Task added!"); 
            }
        }catch (err) {
            res.status(400).send(err.message);
            console.error(err.message);
        }
    },
    async deleteTask(req, res) {
        try {
            const taskCheck = await pool.query("SELECT * FROM tasks WHERE id = $1",[req.params.id]);
            if (taskCheck.rows.length != 0){
                const newTask = await pool.query("DELETE FROM tasks WHERE id = $1",[req.params.id]);
                res.status(200).send('Task deleted!');
                console.log("Task deleted!"); 
            }
            else {
                res.status(404).send('Can not find request task!');   
                console.log("Can not find request task!"); 
            }
        }catch (err) {
            res.status(400).send(err.message);
            console.error(err.message);
        }
    },
    async completedTask(req, res) {
        console.log(req.params);

        let date_ob = new Date();
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let date = ("0" + date_ob.getDate()).slice(-2);
        let year = date_ob.getFullYear();
        let datenow = month + "/" + date + "/" + year 

        let hours = ("0" + date_ob.getHours()).slice(-2);
        let minutes = ("0" + date_ob.getMinutes()).slice(-2);
        let seconds = ("0" + date_ob.getSeconds()).slice(-2);
        let timenow = hours + ":" + minutes + ":" + seconds 

        console.log(datenow);
        console.log(timenow);
        let datetimeText = datenow + " " + timenow;
        
        try {
            const taskCheck = await pool.query("SELECT * FROM tasks WHERE id = $1",[req.params.id]);
            if (taskCheck.rows.length != 0){
                const newTask = await pool.query("UPDATE tasks SET taskdone = $1, isdone = $2 WHERE id = $3",[datetimeText, true, req.params.id]);
                //const newTask = await pool.query("DELETE FROM tasks WHERE id = $1",[req.params.id]);
                res.status(200).send('Task done!');
                console.log("Task done!"); 
            }
            else {
                res.status(404).send('Can not find request task!');   
                console.log("Can not find request task!"); 
            }
        }catch (err) {
            res.status(400).send(err.message);
            console.error(err.message);
        }
    },
};