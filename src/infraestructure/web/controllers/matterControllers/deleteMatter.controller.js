const db = require('');
const createMatter = require('./createMatter.controller');

const deleteMatter = async (req, res) => {
    try{
        const {id} = req.params;

        //borramos las relaciones con los estudiantes
        await db.query('DELETE FROM matter_student WHERE matter_id = ?', [id]);

        // borramos la materia
        await db.query('DELETE FROM matter WHERE id = ?', [id]);

        res.status(200).json({
            message: ' materia eliminada exitosamente',
            matterId: id
        });
    }catch {
        console.error('error al eliminar la materia:', err);
        res.status(500).json({
            error: 'error al eliminar la tarea',
        });
    }
}

module.exports = {
    deleteMatter
}