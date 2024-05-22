const express = require('express');
const router = express.Router();
const { createStudent, getStudents, getStudentById, updateStudent, deleteStudent } = require('../../controllers/studentControllers');
 
router.get('/students', getStudents);

 
router.get('/students/:id', getStudentById);
 
router.post('/students', createStudent);
 
router.put('/students/:id', updateStudent);
 
router.delete('/students/:id', deleteStudent);

router.get('/tasks', getTasks);

router.get('/tasks/:id', getTaskById);

router.post('/tasks', createTask);

router.put('/tasks/:id', updateTask);

router.delete('/tasks/:id', deleteTask);

module.exports = router;
