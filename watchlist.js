const movieHtml = document.querySelector('.movie-html')
const exmpyWatchlistBgTxt = document.querySelector('.watchlist-logo')

// adding an event listener to target movie to be removed from watchlist
movieHtml.addEventListener( 'click', (e) => removeMoviesFromWatchlist(e))

//load seleted movies using localStorage
window.onload = function() {
    if ( localStorage.length !== 0 ) {
        exmpyWatchlistBgTxt.classList.add('hidden')
        const watchlistMovies = JSON.parse( localStorage.getItem('seletedMovies') )
        watchlistMovies.forEach( movies => renderMovieListHtml(movies) )

    }
}

//render movie list html using localStorage
function renderMovieListHtml(movieObj) {
    const seletedMovieHtml = `
        <div class="movie-container">
            <div class="movie-poster">
                <img src="${movieObj.Poster}" alt="${movieObj.Title}" class="movie-poster">
            </div>
            <div class="movie-details">
                <div class="movie-details-section">
                    <div class="movie-title-container">
                        <h3 class="movie-title">${movieObj.Title}</h3>
                        <i class="fa-solid fa-star"></i>
                        <p class="movie-rating">${movieObj.imdbRating}</p>
                    </div>
                    <div class="genre-watchlist-container">
                        <div class="movie-genre-container">
                            <p class="movie-runtime">${movieObj.Runtime}</p>
                            <p class="movie-genre">${movieObj.Genre}</p>
                        </div>
                        <div class="watchlist-con remove-movie-con">
                            <img class="remove-btn" src="img/minus-icon.png" alt="remove-button">
                            <button class="watchlist">remove</button>
                        </div>
                    </div>
                </div>    
                <p id="about-movie" class="movie-plot">${movieObj.Plot}</p>
            </div>     
        </div>    
    `
    movieHtml.innerHTML += seletedMovieHtml
} 

//remove watchlis movie element
function removeMoviesFromWatchlist(e) {
    if(e.target.classList.contains('remove-btn') || e.target.parentElement.classList.contains('remove-movie-con')) {
        const movieEl = e.target.closest('.movie-container')
        const movieTitle = movieEl.querySelector('.movie-title').textContent
        let watchlistMovies = JSON.parse(localStorage.getItem('seletedMovies'))
        watchlistMovies = watchlistMovies.filter(seletedMovie => seletedMovie.Title !== movieTitle)
        localStorage.setItem('seletedMovies', JSON.stringify(watchlistMovies))
        movieHtml.innerHTML = ``
        if(watchlistMovies.length > 0) {
            watchlistMovies.forEach(moviesContainer => renderMovieListHtml(moviesContainer))
        } else {
            exmpyWatchlistBgTxt.classList.remove('hidden')
            localStorage.clear()
        }
    }
 }



 




