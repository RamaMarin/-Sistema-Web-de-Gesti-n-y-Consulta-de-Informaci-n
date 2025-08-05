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


