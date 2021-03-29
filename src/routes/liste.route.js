const express = require('express');
const toDoController = require('../controllers/toDoController');

const router = express.Router();

// All notes
router.get('/', toDoController.findAll);
// Add list
router.post('/lists', toDoController.addList);
// Tasks for a note (url : .../id)
router.get('/tasksByList/:idList', toDoController.findOne);
// delete note (url : .../id)
router.get('/lists/:idList', toDoController.deleteList);
// add task
router.post('/tasks', toDoController.addTask);
// Edit state task
router.get('/tasksByList/:listId/:taskId/:state', toDoController.editState);
// Task details
router.get('/tasksByList/taskDetails/:idTask', toDoController.findtaskDetail);
// Delete task
router.get('/tasksByList/:idList/:idTask', toDoController.removeTask)

module.exports = router;