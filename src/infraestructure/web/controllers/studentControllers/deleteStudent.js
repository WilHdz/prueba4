
const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM student_matter WHERE student_id = ?', [id]);
        await db.query('DELETE FROM student WHERE id = ?', [id]);
        res.status(200).json({
            message: 'Estudiante eliminado exitosamente',
            studentId: id
        });
    } catch (err) {
        console.error('Error al eliminar estudiante:', err);
        res.status(500).json({
            error: 'Error al eliminar estudiante',
        });
    }
};

module.exports = { deleteStudent };