const mongoose = require('mongoose');

const PeliculaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    ano: Number,
    director: String,
    reparto: [String],
    genero: [String], // Esto permitirá la organización por categorías jerárquicas
    sinopsis: String,
    resena: String,
    calificacion: {
        type: Number,
        min: 1,
        max: 10
    },
    etiquetas: [String], // Sistema de etiquetado
    imagen: String // URL de la imagen del cartel
});

module.exports = mongoose.model('Pelicula', PeliculaSchema);