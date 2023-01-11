import { addMovieToWatchlist } from  './utility.js'
const form = document.querySelector('#search-form')
const searchInputEl = document.querySelector('#search-input')
const movieHtml = document.querySelector('#movie-html')
const backgroundLogo = document.querySelector('.background-logo')
let searchTitle = ''



movieHtml.addEventListener('click', (e) => addMovieToWatchlist(e))

// get search movie
form.addEventListener('submit', async (e) => {
    e.preventDefault()
    searchTitle = searchInputEl.value.replaceAll(' ', '+')
    const res = await fetch(`https://www.omdbapi.com/?apikey=31a874b3&s=${searchTitle}`)
    const data = await res.json()
    if (data.Response === 'True') {
        getMovieList(searchTitle, 1)
    } else {
        noMovieFound()
    }
})

//get movie title from api response
async function getMovieList(title) {
    const res = await fetch(`https://www.omdbapi.com/?apikey=31a874b3&s=${title}`)
    const data = await res.json()
    getMovieFromApi(data.Search)
    backgroundLogo.classList.add('hidden')
    searchInputEl.value = ``

}
// get movie details from api and render them to html page
function getMovieFromApi(moviesArr) {
    let listHtml = ``
    moviesArr.forEach( movie => {
        fetch(`https://www.omdbapi.com/?apikey=31a874b3&i=${movie.imdbID}`)
        .then( response => response.json() )
        .then( data => {
            listHtml += `
                <div class="movie-container">
                    <div class="movie-poster.container">
                        <img src="${data.Poster}" alt="${data.Title}" class="movie-poster">
                    </div>
                    <div class="movie-details">
                        <div class="movie-details-section">
                            <div class="movie-title-container">
                                <h3 class="movie-title">${data.Title}</h3>
                                <img src="img/rating star.png" alt="rating-star" class="star">
                                <p class="movie-rating">${data.imdbRating}</p>
                            </div>
                            <div class="genre-watchlist-container">
                                <div class="movie-genre-container">
                                    <p class="movie-runtime">${data.Runtime}</p>
                                    <p class="movie-genre">${data.Genre}</p>
                                </div>
                                <div class="watchlist-con">
                                    <img class="plus add-to-watchlist" src="img/plus-icon.png" alt="plus"> 
                                    <button class="add watchlist">Watchlist</button>
                                </div>
                            </div>
                        </div>    
                        <p id="about-movie" class="movie-plot">${data.Plot}</p>
                    </div>     
                </div>
            `
            movieHtml.innerHTML = listHtml
        })
        
    })
   
}

//  get no movie fund message to background
function noMovieFound(){
    movieHtml.innerHTML= ''
    movieHtml.classList.add('hidden')
    backgroundLogo.classList.remove('hidden')
    backgroundLogo.innerHTML = `
        <p class="noMovieTxt">
            Unable to find what you’re looking
             for. Please try another search.
        </p>
    `
}
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 