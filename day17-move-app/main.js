const moviesWrapper = document.getElementById("moviesWrapper");
const searchForm = document.getElementById("searchForm");

const BASE_API = "https://api.themoviedb.org/3";
const SEARCH = `${BASE_API}/search/movie?include_adult=false&page=1`;
const ALL = `${BASE_API}/movie/popular?page=1`;
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjYzZmFhM2JmYzYxYzZjODk2ZjU4M2RiYjRiNWEyNyIsIm5iZiI6MTczMDA4MzA4NC4yMTg1MDQsInN1YiI6IjY3MWJjOGVkZTgzM2Q5MmVmMDYwMWNhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4PvEQ3NEkR79DgrpH-K5bGKP98ofumDMH7vba0R8is0'
    }
};

window.addEventListener("DOMContentLoaded", () => {
    fetch(ALL, options)
      .then(res => res.json())
      .then(renderMovies)
      .catch(err => console.error(err));
})

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = searchForm.firstElementChild.value;
    fetch(`${SEARCH}&query=${query}`, options)
      .then(res => res.json())
      .then((data) => {
        data.results = data.results.filter(movie => movie.title.toLowerCase().includes(query));
        renderMovies(data);
      })
      .catch(err => console.error(err));
})


function renderMovies(moviesData) {
    moviesWrapper.innerHTML = "";
    for (const movie of moviesData.results) {
        const card = createMovieCard(movie);
        moviesWrapper.appendChild(card);
    }
}

function getRateClass(rate) {
    if (rate >= 8) {
        return "great";
    } else if (rate >= 6.5) {
        return "good";
    } else {
        return "bad";
    }
}

function createMovieCard(movie) {
    const card = document.createElement("div");
    card.classList.add("movie-card");
    card.innerHTML = `
        <figure class="movie-picture">
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="movie image">
        </figure>
        <div class="movie-details">
            <h4 class="movie-title">${movie.title}</h4>
            <div class="movie-rate">
                <span class="${getRateClass(movie.vote_average)}">${movie.vote_average.toFixed(1)}</span>
            </div>
        </div>
        <div class="movie-overview">
            <h3>Overview</h3>
            <p>${movie.overview}</p>
        </div>
    `;
    return card;
}
