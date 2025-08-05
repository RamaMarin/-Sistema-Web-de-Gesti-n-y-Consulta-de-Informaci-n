# Sistema-Web-de-Gestion-y-Consulta-de-Informacion

---

## Reseñas de peliculas
A dynamic movie review website built with a modern and attractive aesthetic. This project showcases a full-stack architecture, connecting a vanilla JavaScript frontend with a Node.js API and a MongoDB database. The goal is to provide a platform where movie lovers can explore, search, and read movie reviews in a dynamic and efficient manner.

## Key Features

* **Dynamic Content Loading:** The site automatically loads movie reviews from a MongoDB database.

* **Flexible Search Interface:** Allows searching for movies by titulo, director, reparto (cast), or etiquetas (tags). The search is case-insensitive and supports partial matches.

* **Genre Filtering:** Navigate through different movie categories (e.g., Acción, Comedia, Drama).

* **Individual Review Pages:** Each review has its own dedicated page with detailed information, ratings, and tags.

* **Responsive Design:** The interface adapts to different screen sizes, providing an optimal experience on desktops, tablets, and mobile devices.

* **RESTful API Backend:** A robust API that enables CRUD (Create, Read, Update, Delete) operations on the database.

## Technologies Used

* **Frontend:** HTML, CSS, JavaScript (Vanilla JS).

* **Backend:** Node.js, Express.js.

* **Database:** MongoDB (using Mongoose for schema definition).

## Project Structure

The application is divided into two main directories:

``` bash

mi-proyecto-reseñas/
├── backend/
│   ├── models/
│   │   └── Pelicula.js
│   ├── node_modules/
│   ├── package.json
│   └── server.js
└── frontend/
    ├── index.html
    ├── review-page.html
    ├── style.css
    ├── script.js
    └── review-script.js

```

## Installation and Local Setup

Follow these steps to get the project up and running on your local machine.

**1. Prerequisites**

Make sure you have the following installed:

Node.js and npm: Download from nodejs.org.

MongoDB: Ensure a MongoDB server is running on your machine (you can use MongoDB Compass to manage it).

**2. Clone the Repository**

``` bash

git clone https://github.com/tu-usuario/nombre-del-repo.git
cd nombre-del-repo

```

**3. Backend Setup**

Navigate to the backend directory, install dependencies, and start the server.

``` bash

cd backend
npm install
node server.js

```

If everything is successful, you will see the message Servidor escuchando en http://localhost:3000 and Conectado a MongoDB.

**4. Loading Data into the Database**

To see reviews on the website, you need to add data to the reseñas-peliculas database in the peliculas collection. You can easily do this with MongoDB Compass by inserting JSON documents.

## Usage

Once the backend server is running, open your web browser and navigate to:

``` bash
http://localhost:3000
```

* **Homepage:** You will see the "Reseñas Destacadas" section with content loaded from your database.
* **Search** Use the search bar to find movies by titulo, director, reparto, or etiquetas.
* **Review Page:** Click "Leer reseña completa" to view the full details of a movie. 


