const express = require('express');
const router = express.Router();
const { createTeacher, getTeachers, getTeacherById, updateTeacher, deleteTeacher } = require('../controllers/teacherController');

router.get('/teachers', getTeachers);
router.get('/teachers/:id', getTeacherById);
router.post('/teachers', createTeacher);
router.put('/teachers/:id', updateTeacher);
router.delete('/teachers/:id', deleteTeacher);

module.exports = router;