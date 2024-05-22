

const deleteTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM teacher_matter WHERE teacher_id = ?', [id]);
        await db.query('DELETE FROM teacher WHERE id = ?', [id]);
        res.status(200).json({
            message: 'Maestro eliminado exitosamente',
            teacherId: id
        });
    } catch (err) {
        console.error('Error al eliminar maestro:', err);
        res.status(500).json({
            error: 'Error al eliminar maestro',
        });
    }
};

module.exports = {
    deleteTeacher
}