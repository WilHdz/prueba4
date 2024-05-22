const db = require('../config/db');

const createTeacher = async (req, res) => {
    try {
        const { name, email, matters } = req.body;
        if (!name || !email || !matters || !Array.isArray(matters)) {
            return res.status(400).json({
                error: 'Todos los campos son requeridos y matters debe ser un array'
            });
        }
        const [result] = await db.query('INSERT INTO teacher (name, email) VALUES (?, ?)', [name, email]);
        const teacherId = result.insertId;
        const matterInserts = [];
        for (const matterId of matters) {
            const [matterResult] = await db.query('INSERT INTO teacher_matter (teacher_id, matter_id) VALUES (?, ?)', [teacherId, matterId]);
            matterInserts.push(matterResult.insertId);
        }
        res.status(201).json({
            message: 'Maestro creado exitosamente',
            teacherId,
            matterInserts
        });
    } catch (err) {
        console.error('Error al crear maestro:', err);
        res.status(500).json({
            error: 'Error al crear maestro',
        });
    }
};

const getTeachers = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM teacher');
        res.json(rows);
    } catch (err) {
        console.error('Error al obtener maestros:', err);
        res.status(500).json({
            error: 'Error al obtener maestros',
        });
    }
};

const getTeacherById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query('SELECT * FROM teacher WHERE id = ?', [id]);
        if (rows.length > 0) {
            const teacher = rows[0];
            const [matters] = await db.query('SELECT matter_id FROM teacher_matter WHERE teacher_id = ?', [id]);
            teacher.matters = matters.map(m => m.matter_id);
            res.json(teacher);
        } else {
            res.status(404).json({ message: 'Maestro no encontrado' });
        }
    } catch (err) {
        console.error('Error al obtener maestro:', err);
        res.status(500).json({
            error: 'Error al obtener maestro',
        });
    }
};




module.exports = { 
    createTeacher, 
    getTeachers, 
    getTeacherById
};
