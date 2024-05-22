
//configurar la ruta de la bd
const db = require('');

const createMatter = async (req, res) => {
    try {
        const { name, description, student } = req.body;
 
        if (!name || !description || !student) {
            return res.status(400).json({
                     error: 'todos los campos son requeridos'});
        }
 
        const [result] = await db.query('INSERT INTO matter (name, description) VALUES (?, ?)', [name, description]);
        const matterId = result.insertId;

 
        const studentInsert = [];
        for (const studentId of student) {
        const [result] = await db.query('INSERT INTO materia_alumno (materia_id, alumno_id) VALUES (?, ?)', [matterId, studentId]);
        studentInserts.push(result.insertId);
       }

        res.status(200).json({
        message: 'materia creada exitosamente',
        matterId, studentInsert
        });

    } catch (err) {
        console.error('Error al crear materia:', err);
        res.status.json({
            error: 'error al crear materia',
        });
    }
}

module.exports = {
    createMatter
}