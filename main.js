const moviesList = document.getElementById("movies-list");

async function getTrendingMovies() {
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result.results);
    const moviesArr = result.results;
    let moviesHtml = moviesArr
      .map(
        (movie) =>
          `
          <div class="movie-card">
            <img class="movie-img" src="https://image.tmdb.org/t/p/w400${movie.poster_path}" alt="${movie.title}">
            <div class="movie-info">
              <p class="movie-title">${movie.title}</p>
            </div>
          </div>
          `
      )
      .join("");

    moviesList.innerHTML = moviesHtml;
  } catch (error) {
    console.error(error.message);
  }
}
getTrendingMovies();
