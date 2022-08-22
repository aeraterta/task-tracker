const taskController = require('../controllers/task');

module.exports = (app) => {

    app.get('/api', (req, res) => res.status(200).send({
      message: 'Welcome to task tracker API!',
    }));

    // To Do: Get all tasks
    app.get('/api/todo', taskController.getList);
    // To Do: Add task
    app.post('/api/todo', taskController.addTask);
    // To Do: Delete Task
    app.delete('/api/todo/:id', taskController.deleteTask);
    // To Do: Done task
    app.put('/api/todo/:id', taskController.completedTask);
  };