//get seleted movie using local storage
function addMovieToWatchlist(e) {
    if(e.target.classList.contains('add-to-watchlist') 
        || e.target.parentElement.classList.contains('watchlist-con')) {
        const movieEl = e.target.closest('.movie-container')
        const movieObj = {
            Poster: movieEl.querySelector('.movie-poster').src,
            Title: movieEl.querySelector('.movie-title').textContent,
            imdbRating: movieEl.querySelector('.movie-rating').textContent,
            Runtime: movieEl.querySelector('.movie-runtime').textContent,
            Genre: movieEl.querySelector('.movie-genre').textContent,
            Plot: movieEl.querySelector('.movie-plot').textContent,
        }
        
        let seletedMoviesArr = []
        if(localStorage.length !== 0) {
            seletedMoviesArr = JSON.parse( localStorage.getItem('seletedMovies'))
        }
        if ( !searchDuplicates(seletedMoviesArr, movieObj.Title) ){
            seletedMoviesArr.unshift(movieObj)
            localStorage.setItem('seletedMovies', JSON.stringify(seletedMoviesArr))
            
        } else {
            alert('This movie already exist in your watchlist!')
        }
        
    }

}

//detect duplicates movie names
function searchDuplicates (seletedMovieList, movieTitle) {
    const filterSeletedMovieArr = seletedMovieList.filter( selectedMovie => selectedMovie.Title === movieTitle)
    return filterSeletedMovieArr.length !== 0 ? true : false
}

export{ addMovieToWatchlist }
