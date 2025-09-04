const moviesList = document.getElementById("movies-list");
const loadMoreBtn = document.getElementById("load-more-btn");
let currentPage = 1;
loadMoreBtn.disabled = true;
loadMoreBtn.textContent = "Loading...";

async function getTrendingMovies(page = 1) {
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=${page}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    if (currentPage >= result.total_pages) {
      loadMoreBtn.style.display = "none";
    }
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
    if (page === 1) {
      moviesList.innerHTML = "";
    }
    moviesList.insertAdjacentHTML("beforeend", moviesHtml);
    loadMoreBtn.disabled = false;
    loadMoreBtn.textContent = "Load More ...";
  } catch (error) {
    console.error(error.message);
  }
}

getTrendingMovies();

loadMoreBtn.addEventListener("click", function () {
  currentPage++;
  getTrendingMovies(currentPage);
});
