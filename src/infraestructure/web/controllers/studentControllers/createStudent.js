const db = require('../config/db');

const createStudent = async (req, res) => {
    try {
        const { name, email, matters } = req.body;
        if (!name || !email || !matters || !Array.isArray(matters)) {
            return res.status(400).json({
                error: 'Todos los campos son requeridos y matters debe ser un array'
            });
        }
        const [result] = await db.query('INSERT INTO student (name, email) VALUES (?, ?)', [name, email]);
        const studentId = result.insertId;
        const matterInserts = [];
        for (const matterId of matters) {
            const [matterResult] = await db.query('INSERT INTO student_matter (student_id, matter_id) VALUES (?, ?)', [studentId, matterId]);
            matterInserts.push(matterResult.insertId);
        }
        res.status(201).json({
            message: 'Estudiante creado exitosamente',
            studentId,
            matterInserts
        });
    } catch (err) {
        console.error('Error al crear estudiante:', err);
        res.status(500).json({
            error: 'Error al crear estudiante',
        });
    }
};

const getStudents = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM student');
        res.json(rows);
    } catch (err) {
        console.error('Error al obtener estudiantes:', err);
        res.status(500).json({
            error: 'Error al obtener estudiantes',
        });
    }
};

const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query('SELECT * FROM student WHERE id = ?', [id]);
        if (rows.length > 0) {
            const student = rows[0];
            const [matters] = await db.query('SELECT matter_id FROM student_matter WHERE student_id = ?', [id]);
            student.matters = matters.map(m => m.matter_id);
            res.json(student);
        } else {
            res.status(404).json({ message: 'Estudiante no encontrado' });
        }
    } catch (err) {
        console.error('Error al obtener estudiante:', err);
        res.status(500).json({
            error: 'Error al obtener estudiante',
        });
    }
};
 
 

module.exports = { createStudent, getStudents, getStudentById };
