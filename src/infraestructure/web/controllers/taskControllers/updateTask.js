
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, deadline, matterId, studentIds } = req.body;
        if (!title || !description || !deadline || !matterId || !studentIds || !Array.isArray(studentIds)) {
            return res.status(400).json({
                error: 'Todos los campos son requeridos y studentIds debe ser un array'
            });
        }
        await db.query('UPDATE task SET title = ?, description = ?, deadline = ?, matter_id = ? WHERE id = ?', [title, description, deadline, matterId, id]);
        await db.query('DELETE FROM task_student WHERE task_id = ?', [id]);
        const studentInserts = [];
        for (const studentId of studentIds) {
            const [studentResult] = await db.query('INSERT INTO task_student (task_id, student_id) VALUES (?, ?)', [id, studentId]);
            studentInserts.push(studentResult.insertId);
        }
        res.status(200).json({
            message: 'Tarea actualizada exitosamente',
            taskId: id,
            studentInserts
        });
    } catch (err) {
        console.error('Error al actualizar tarea:', err);
        res.status(500).json({
            error: 'Error al actualizar tarea',
        });
    }
};

module.exports = { 
    updateTask
};