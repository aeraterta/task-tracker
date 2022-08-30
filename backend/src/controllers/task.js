const pool = require('../config/db');

module.exports = {
    async getList(req, res) {
        try {
            const taskList = await pool.query("SELECT * FROM tasks");
            res.status(200).send(taskList.rows);
        }catch (err) {
            res.status(400).send(err.message);
            console.error(err.message);
        }
    },
    async addTask(req, res) {
        try {

            //Check if task exists in tasks table via taskname query
            const taskCheck = await pool.query("SELECT taskname FROM tasks WHERE taskname = $1",[req.body.taskname]);
            if (taskCheck.rows.length != 0){
                res.status(409).send('Duplicate Content!');   
                console.log("Duplicate Content!"); 
            }
            else {
                //Add new task entry into tasks table
                const newTask = await pool.query("INSERT INTO tasks (taskname,taskdue,isdone,tstamp) VALUES ($1, $2, $3, $4) RETURNING *",[req.body.taskname, req.body.taskdue, req.body.isdone, req.body.tstamp]);
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
            //Check if task exists in tasks table via id query
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

        try {
            //Check if task exists in tasks table via id query
            const taskCheck = await pool.query("SELECT * FROM tasks WHERE id = $1",[req.params.id]);
            
            let tStamp = new Date();
            if (taskCheck.rows.length != 0){
                if (taskCheck.rows[0].isdone === false){
                    const newTask = await pool.query("UPDATE tasks SET isdone = $1, tstamp = $2 WHERE id = $3",[true, tStamp, req.params.id]);                 
                    res.status(200).send(tStamp);
                    }
                else {
                    const newTask = await pool.query("UPDATE tasks SET isdone = $1, tstamp = $2 WHERE id = $3",[ false, null, req.params.id]);
                    res.status(200).send(null);
                }
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