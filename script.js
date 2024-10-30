const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function () {
    try {
        const inputKeyword = document.querySelector('.input-keyword');
        const movies = await getMovies(inputKeyword.value);
        updateUI(movies);
    } catch (error) {
        // alert(error);
        updateEror(error);
    }
});

function getMovies(keyword) {
    return fetch('http://www.omdbapi.com/?apikey=f5b22d2c&s=' + keyword)
        .then(response => {
            if (!response.ok) {
                // console.log(response);
                throw new Error('Gagal konek ke API');
            }
            return response.json();

        })
        .then(response => {
            if (response.Response === "False") {
                throw new Error("Movie tidak ada");
            }
            // console.log(response);
            return response.Search;

        })
};

function updateUI(movies) {
    let cards = '';
    movies.forEach(movie => {
        cards += showMovie(movie);
        const movieContainer = document.querySelector('.movies-container');
        movieContainer.innerHTML = cards;
    })
};

function updateEror(eror) {
    const erorContainer = document.querySelector('.movies-container');
    erorContainer.innerHTML = uiError(eror);
}

function uiError(eror) {
    return `<div class="col">
                <h1>${eror}</h1>
            </div>`
};

// event binding
document.addEventListener('click', async function (e) {
    if (e.target.classList.contains('modal-details-button')) {
        try {
            const imdbid = e.target.dataset.imdbid;
            const movieDetails = await getMoviesDetail(imdbid);
            updateUIDetails(movieDetails);

        } catch (error) {
            // console.log(error)
            updateErorDetail(error);
        }
    }
});


function getMoviesDetail(imdbid) {
    return fetch('http://www.omdbapi.com/?apikey=f5b22d2c&i=' + imdbid)
        .then(response => {
            if (!response.ok) {
                // console.log(response)
                // throw new Error(response.status);
                throw new Error('Gagal konek ke API');
                // return "Gagal Konek API"
            }
            return response.json();
        })
        .then(response => response)
};

function updateErorDetail(eror) {
    const erorContainer = document.querySelector('.modal-body');
    erorContainer.innerHTML = uiErrorDetail(eror);
}

function uiErrorDetail(eror) {
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col">
                        <h5>${eror}</h5>
                    </div>
                </div>
            </div>`
};

function updateUIDetails(movieDetails) {
    const detail = showMovieDetails(movieDetails);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = detail;
};


function showMovie(movie) {
    return `<div class="col-md-4 my-3">
                            <div class="card">
                                <img src="${movie.Poster}" class="card-img-top">
                                <div class="card-body">
                                    <h5 class="card-title">${movie.Title}</h5>
                                    <h6 class="card-subtitle mb-2 text-body-secondary">${movie.Year}</h6>
                                    <a href="#" class="btn btn-primary modal-details-button" data-bs-toggle="modal" data-bs-target="#moviesDetailModal" data-imdbid="${movie.imdbID}">Show Details</a>
                                </div>
                            </div>
                        </div>`
}


function showMovieDetails(dtl) {
    return `<div class="container-fluid">
                <div class="row">
                <div class="col-md-3">
                    <img src="${dtl.Poster}" class="img-fluid">
                </div>
                <div class="col-md">
                    <ul class="list-group">
                    <li class="list-group-item">
                        <h4>
                        ${dtl.Title} (${dtl.Year})
                        </h4>
                    </li>
                    <li class="list-group-item">
                        <strong>Director : </strong> ${dtl.Director}
                    </li>
                    <li class="list-group-item">
                        <strong>Actors : </strong> ${dtl.Actors}
                    </li>
                    <li class="list-group-item">
                        <strong>Write : </strong> ${dtl.Writer}
                    </li>
                    <li class="list-group-item">
                        <strong>Plot : </strong><br> ${dtl.Plot}
                    </li>
                    </ul>
                </div>
                </div>
            </div>`
}