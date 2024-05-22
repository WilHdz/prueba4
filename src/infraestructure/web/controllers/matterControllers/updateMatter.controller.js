const db = require('');
const createMatter = require('./createMatter.controller')


const updateMatter = async (req, res) => {
    try{
        const {id} = req.params;
        const {name, description, students} = req.body;

        // validamos los campos
        if(!name || !description || !students) {
            return res.status(400).json({ error: 'Todos los campos son requeridos'});
        }

        // aqui popdemos actualizar la materia en la bd
        await db.query('UPDATE matter SET name = ?, description = ? WHERE id = ?', [name, description, id]);

        // Borramos los estudiantes actuales y añadimos los nuevos
        await db.query('DELETE FROM matter_student WHERE matter_id = ?', [id]);
        const studentInsert = [];
        for (const studentId of students) {
            const [studentResult] = await db.query('INSERT INTO matter_student (matter_id, student_id) (?, ?)', [id, studentId]);
            studentInserts.push(studentResult.insertId);
        }

        res.status(200).json({
            message: 'materia actualizada',
            matterId: id,
            studentInserts
        });

    } catch {
        console.error('error al actualizar la materia', err);
        res.status(500).json({
            error: 'error al actualizar la tarea',
        });
    }
}

module.exports = {
    updateMatter
}