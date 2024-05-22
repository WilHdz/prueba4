

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM task_student WHERE task_id = ?', [id]);
        await db.query('DELETE FROM task WHERE id = ?', [id]);
        res.status(200).json({
            message: 'Tarea eliminada exitosamente',
            taskId: id
        });
    } catch (err) {
        console.error('Error al eliminar tarea:', err);
        res.status(500).json({
            error: 'Error al eliminar tarea',
        });
    }
};

module.exports = {
     deleteTask
    };