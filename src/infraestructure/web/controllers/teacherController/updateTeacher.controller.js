

const updateTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, matters } = req.body;
        if (!name || !email || !matters || !Array.isArray(matters)) {
            return res.status(400).json({
                error: 'Todos los campos son requeridos y matters debe ser un array'
            });
        }
        await db.query('UPDATE teacher SET name = ?, email = ? WHERE id = ?', [name, email, id]);
        await db.query('DELETE FROM teacher_matter WHERE teacher_id = ?', [id]);
        const matterInserts = [];
        for (const matterId of matters) {
            const [matterResult] = await db.query('INSERT INTO teacher_matter (teacher_id, matter_id) VALUES (?, ?)', [id, matterId]);
            matterInserts.push(matterResult.insertId);
        }
        res.status(200).json({
            message: 'Maestro actualizado exitosamente',
            teacherId: id,
            matterInserts
        });
    } catch (err) {
        console.error('Error al actualizar maestro:', err);
        res.status(500).json({
            error: 'Error al actualizar maestro',
        });
    }
};

module.exports = {
    updateTeacher
}