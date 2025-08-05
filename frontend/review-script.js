document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const peliculaId = params.get('id');

    if (!peliculaId) {
        document.querySelector('main.review-container').innerHTML = '<p>No se encontró el ID de la película.</p>';
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/peliculas/${peliculaId}`);
        const pelicula = await response.json();

        if (response.status === 404) {
            document.querySelector('main.review-container').innerHTML = '<p>La reseña solicitada no existe.</p>';
            return;
        }

        // Actualiza el contenido de la página con los datos de la película
        document.title = `Reseña: ${pelicula.titulo}`;
        document.querySelector('.movie-info-details h1').textContent = pelicula.titulo;
        document.querySelector('.movie-poster-large').src = pelicula.imagen;
        document.querySelector('.movie-poster-large').alt = `Cartel de ${pelicula.titulo}`;
        document.querySelector('.movie-info-details p:nth-child(2)').innerHTML = `<strong>Año:</strong> ${pelicula.ano}`;
        document.querySelector('.movie-info-details p:nth-child(3)').innerHTML = `<strong>Director:</strong> ${pelicula.director}`;
        document.querySelector('.movie-info-details p:nth-child(4)').innerHTML = `<strong>Reparto:</strong> ${pelicula.reparto.join(', ')}`;
        document.querySelector('.movie-info-details p:nth-child(5)').innerHTML = `<strong>Género:</strong> ${pelicula.genero.join(', ')}`;
        document.querySelector('.movie-info-details p:nth-child(6)').innerHTML = `<strong>Sinopsis:</strong> ${pelicula.sinopsis}`;
        document.querySelector('.rating-display span:nth-child(2)').textContent = `${pelicula.calificacion}/10`;
        document.querySelector('.review-body h3').textContent = 'Análisis Completo';
        document.querySelector('.review-body p').textContent = pelicula.resena;

        // Renderiza las etiquetas
        const tagsContainer = document.querySelector('.tags');
        if (tagsContainer) {
            tagsContainer.innerHTML = '<h4>Etiquetas:</h4>';
            pelicula.etiquetas.forEach(tag => {
                const tagSpan = document.createElement('span');
                tagSpan.classList.add('tag');
                tagSpan.textContent = tag;
                tagsContainer.appendChild(tagSpan);
            });
        }
        
    } catch (err) {
        console.error('Error al cargar la reseña:', err);
        document.querySelector('main.review-container').innerHTML = '<p>Ocurrió un error al cargar la reseña.</p>';
    }
});