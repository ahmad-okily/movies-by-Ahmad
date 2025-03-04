const API_KEY = 'd6997f40698bae7b7d1ff9ad5e18eda9'; // Keep your API key safe!
const API_URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;

function getTrendingMovies() {
    fetch(API_URL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            displayMovies(data.results);
        })
        .catch(function(error) {
            console.error("Error fetching movies:", error);
        });
}

function displayMovies(movies_trending) {
    const container = document.getElementById("movie-container_trending");
    container.innerHTML = ""; // Clear old data

    movies_trending.forEach(function(movie_trending) {
        if (!movie_trending.poster_path) return; // Skip movies without posters

        const movieElement = document.createElement("div");
        movieElement.classList.add("movie_trending");
        movieElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie_trending.poster_path}" alt="${movie_trending.title}">
            <h2>${movie_trending.title}</h2>
            <p>⭐ ${movie_trending.vote_average.toFixed(1)}</p>
        `;
        container.appendChild(movieElement);
    });
}

// Load trending movies on page load
getTrendingMovies();
