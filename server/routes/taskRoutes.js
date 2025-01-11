const express = require('express');
const bodyParser = require('body-parser');
const { 
    createTask, 
    getAllTasks, 
    updateTask, 
    deleteTask, 
    getTaskById 
} = require('../controllers/taskController');

const router = express.Router();

router.use(bodyParser.json());


router.post('/tasks', createTask);
router.get('/tasks', getAllTasks);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);
router.get('/tasks/:id', getTaskById);

module.exports = router;
