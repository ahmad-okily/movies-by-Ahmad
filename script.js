const searchButton = document.getElementById("search-btn");
const movieInput = document.getElementById("movie-input");
const movieResults = document.getElementById("movie-results");

const apiKey = "7d9793c1";
const apiUrl = "https://www.omdbapi.com/?apikey=" + apiKey + "&s=";

// Fetch and display movies
const fetchAndDisplayMovies = function (query) {
  fetch(apiUrl + query)
    .then((response) => response.json())
    .then((data) => {
      const movies = data.Search || [];
      localStorage.setItem("movies", JSON.stringify(movies));

      movieResults.innerHTML = movies.length
        ? movies
            .map(
              (movie) => `
        <div class="movie">
          <img src="${movie.Poster}" alt="${movie.Title}" />
          <h3>${movie.Title}</h3>
          <p>Release Year: ${movie.Year}</p>
        </div>
      `
            )
            .join("")
        : "<p>No movies found.</p>";
    });
};

// Load stored movies on page load
const loadMoviesFromStorage = function () {
  const storedMovies = JSON.parse(localStorage.getItem("movies")) || [];
  movieResults.innerHTML = storedMovies.length
    ? storedMovies
        .map(
          (movie) => `
    <div class="movie">
      <img src="${movie.Poster}" alt="${movie.Title}" />
      <h3>${movie.Title}</h3>
      <p>Release Year: ${movie.Year}</p>
    </div>
  `
        )
        .join("")
    : "<p>No movies found.</p>";
};

// Fetch popular movies when the page loads
const fetchTrendingMovies = function () {
  const trendingQuery = "popular";
  fetchAndDisplayMovies(trendingQuery);
};

// Event listener for search button
searchButton.addEventListener("click", function () {
  const query = movieInput.value.trim();
  if (query) {
    fetchAndDisplayMovies(query);
    movieInput.value = "";
  }
});

// Event listener for pressing Enter key
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const query = movieInput.value.trim();
    if (query) {
      fetchAndDisplayMovies(query);
      movieInput.value = "";
    }
  }
});

window.onload = function () {
  loadMoviesFromStorage();
  fetchTrendingMovies();
};
