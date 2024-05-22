const db = require('../config/db');

const createTask = async (req, res) => {
    try {
        const { title, description, deadline, matterId, studentIds } = req.body;
        if (!title || !description || !deadline || !matterId || !studentIds || !Array.isArray(studentIds)) {
            return res.status(400).json({
                error: 'Todos los campos son requeridos y studentIds debe ser un array'
            });
        }
        const [result] = await db.query('INSERT INTO task (title, description, deadline, matter_id) VALUES (?, ?, ?, ?)', [title, description, deadline, matterId]);
        const taskId = result.insertId;
        const studentInserts = [];
        for (const studentId of studentIds) {
            const [studentResult] = await db.query('INSERT INTO task_student (task_id, student_id) VALUES (?, ?)', [taskId, studentId]);
            studentInserts.push(studentResult.insertId);
        }
        res.status(201).json({
            message: 'Tarea creada exitosamente',
            taskId,
            studentInserts
        });
    } catch (err) {
        console.error('Error al crear tarea:', err);
        res.status(500).json({
            error: 'Error al crear tarea',
        });
    }
};

const getTasks = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM task');
        res.json(rows);
    } catch (err) {
        console.error('Error al obtener tareas:', err);
        res.status(500).json({
            error: 'Error al obtener tareas',
        });
    }
};

const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query('SELECT * FROM task WHERE id = ?', [id]);
        if (rows.length > 0) {
            const task = rows[0];
            const [students] = await db.query('SELECT student_id FROM task_student WHERE task_id = ?', [id]);
            task.studentIds = students.map(s => s.student_id);
            res.json(task);
        } else {
            res.status(404).json({ message: 'Tarea no encontrada' });
        }
    } catch (err) {
        console.error('Error al obtener tarea:', err);
        res.status(500).json({
            error: 'Error al obtener tarea',
        });
    }
};


module.exports = { createTask, getTasks, getTaskById };
