import express from 'express';
import router from './infraestructure/web/routes/teacherRoutes/Teacher.routes';
import { DB_CONFIG } from './infraestructure/database/config/BD';
const app = express();

app.use('/api', router);

app.use((req, res) => {
    res.status(404).json({ error: 'ruta no encontrada' });
});

const PORT = DB_CONFIG.PORT || 3000;  

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${DB_CONFIG}`);
});
