document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const reviewsGrid = document.querySelector('.reviews-grid');
    const genreLinks = document.querySelectorAll('.genre-card');
    
    // Función para renderizar una lista de películas en el HTML
    function renderPeliculas(peliculas) {
        reviewsGrid.innerHTML = ''; // Limpia el contenido existente
        if (peliculas.length === 0) {
            reviewsGrid.innerHTML = '<p>No se encontraron reseñas.</p>';
            return;
        }

        peliculas.forEach(pelicula => {
            const reviewCard = document.createElement('article');
            reviewCard.classList.add('review-card');
            
            // Creamos un ID único para la URL de la reseña
            const reviewUrl = `review-page.html?id=${pelicula._id}`;

            reviewCard.innerHTML = `
                <a href="${reviewUrl}" class="review-link">
                    <img src="${pelicula.imagen}" alt="Cartel de la película ${pelicula.titulo}" class="movie-poster">
                    <div class="review-info">
                        <h3>${pelicula.titulo}</h3>
                        <p>${pelicula.sinopsis ? pelicula.sinopsis.substring(0, 100) + '...' : 'Sinopsis no disponible'}</p>
                        <span class="read-more">Leer reseña completa ➡️</span>
                    </div>
                </a>
            `;
            reviewsGrid.appendChild(reviewCard);
        });
    }

    // Función para cargar las reseñas destacadas al inicio
    async function loadFeaturedReviews() {
        try {
            const response = await fetch('http://localhost:3000/api/peliculas');
            const peliculas = await response.json();
            // Mostrar solo 3-5 reseñas destacadas, por ejemplo
            const featuredPeliculas = peliculas.slice(0, 20); 
            renderPeliculas(featuredPeliculas);
        } catch (err) {
            console.error('Error al cargar reseñas:', err);
            reviewsGrid.innerHTML = '<p>No se pudieron cargar las reseñas destacadas.</p>';
        }
    }

    // Funcionalidad de la barra de búsqueda
    searchButton.addEventListener('click', async () => {
        const query = searchInput.value;
        if (query.trim() !== '') {
            try {
                const response = await fetch(`http://localhost:3000/api/peliculas?search=${query}`);
                const peliculas = await response.json();
                renderPeliculas(peliculas);
            } catch (err) {
                console.error('Error al buscar películas:', err);
            }
            searchInput.value = '';
        } else {
            loadFeaturedReviews(); // Vuelve a cargar las destacadas si la búsqueda está vacía
        }
    });

    // Permitir buscar con la tecla 'Enter'
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });

    // Funcionalidad para enlaces de género
    genreLinks.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const genre = e.target.textContent;
            try {
                const response = await fetch(`http://localhost:3000/api/peliculas?genero=${genre}`);
                const peliculas = await response.json();
                renderPeliculas(peliculas);
            } catch (err) {
                console.error('Error al filtrar por género:', err);
            }
        });
    });

    // Cargar las reseñas al iniciar la página
    loadFeaturedReviews();
});