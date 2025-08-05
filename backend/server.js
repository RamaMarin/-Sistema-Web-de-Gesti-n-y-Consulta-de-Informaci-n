const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Módulo para manejar rutas de archivos

const app = express();
const port = 3000;

// Middleware para servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Middleware para parsear JSON y habilitar CORS
app.use(express.json());
app.use(cors());

// Conexión a MongoDB
const mongoURI = 'mongodb://localhost:27017/reseñas-peliculas';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error de conexión a MongoDB:', err));

// Esquema de la Película
const PeliculaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    ano: Number,
    director: String,
    reparto: [String],
    genero: [String],
    sinopsis: String,
    resena: String,
    calificacion: { type: Number, min: 1, max: 10 },
    etiquetas: [String],
    imagen: String
});

const Pelicula = mongoose.model('Pelicula', PeliculaSchema);

// ** Rutas de la API **

// Ruta para crear una nueva reseña (CREATE)
app.post('/api/peliculas', async (req, res) => {
    try {
        const nuevaPelicula = new Pelicula(req.body);
        await nuevaPelicula.save();
        res.status(201).json(nuevaPelicula);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Ruta para obtener todas las reseñas o filtrar por búsqueda (READ)
app.get('/api/peliculas', async (req, res) => {
    try {
        let query = {};
        
        // Filtrado por género
        if (req.query.genero) {
            query.genero = req.query.genero;
        }

        // Búsqueda por título, director, reparto o etiquetas
        if (req.query.search) {
            const search = req.query.search;
            query = {
                $or: [
                    { titulo: { $regex: search, $options: 'i' } },
                    { director: { $regex: search, $options: 'i' } },
                    { 'reparto.0': { $regex: search, $options: 'i' } },
                    { 'etiquetas.0': { $regex: search, $options: 'i' } }
                ]
            };
        }

        const peliculas = await Pelicula.find(query);
        res.json(peliculas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ruta para obtener una reseña específica por ID (READ)
app.get('/api/peliculas/:id', async (req, res) => {
    try {
        const pelicula = await Pelicula.findById(req.params.id);
        if (!pelicula) return res.status(404).json({ message: 'Reseña no encontrada' });
        res.json(pelicula);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ruta para actualizar una reseña (UPDATE)
app.patch('/api/peliculas/:id', async (req, res) => {
    try {
        const pelicula = await Pelicula.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!pelicula) return res.status(404).json({ message: 'Reseña no encontrada' });
        res.json(pelicula);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Ruta para eliminar una reseña (DELETE)
app.delete('/api/peliculas/:id', async (req, res) => {
    try {
        const pelicula = await Pelicula.findByIdAndDelete(req.params.id);
        if (!pelicula) return res.status(404).json({ message: 'Reseña no encontrada' });
        res.json({ message: 'Reseña eliminada' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ruta para servir el archivo review-page.html con los parámetros de la URL
app.get('/review-page.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/review-page.html'));
});

// Ruta de fallback para la página de inicio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});