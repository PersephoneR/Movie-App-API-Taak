// https://www.themoviedb.org/
// https://developers.themoviedb.org/3/getting-started

// kolom 1 => knop => lijst met alle genres
// kolom 2 => knop => trending personen hun foto's van de laatste week
// kolom 3 => knop => alle info tonen van de film "ex-machina" (misschien heb je de id nodig om de detail van deze film te kunnen opvragen)

const ulGenres = document.querySelector(".genres");
const ulTrending = document.querySelector(".trending");
const ulInfo = document.querySelector(".info");
const urlGenres = 'https://api.themoviedb.org/3/genre/movie/list?api_key=40eee73fb470c40780d908c385933ff2&language=en-US';
const urlTrending = 'https://api.themoviedb.org/3/trending/person/week?api_key=40eee73fb470c40780d908c385933ff2';
const urlInfo = 'https://api.themoviedb.org/3/movie/264660?api_key=40eee73fb470c40780d908c385933ff2&language=en-US';
const submitButton1 = document.getElementById("button1");
const submitButton2 = document.getElementById("button2");
const submitButton3 = document.getElementById("button3");

submitButton1.addEventListener("click", function(e){
    e.preventDefault();
    toonGenres();
})

submitButton2.addEventListener("click", function(e){
  e.preventDefault();
  toonTrending();
})

submitButton3.addEventListener("click", function(e){
  e.preventDefault();
  toonInfo();
})

function toonGenres() {
  submitButton1.setAttribute("disabled", "");
  fetch(urlGenres)
    .then(res => res.json())
    .then(data => {
        genresLijst(data.genres)
        submitButton1.removeAttribute("disabled");
    }).catch(err => {
        console.error('Error: ', err);
    });
}

function toonTrending() {
  submitButton2.setAttribute("disabled", "");
  fetch(urlTrending)
    .then(res => res.json())
    .then(data => {
        trendingLijst(data.results)
        submitButton2.removeAttribute("disabled");
    }).catch(err => {
        console.error('Error: ', err);
    });
}

function toonInfo() {
  submitButton3.setAttribute("disabled", "");
  fetch(urlInfo)
    .then(res => res.json())
    .then(data => {
        infoLijst(data)
        submitButton3.removeAttribute("disabled");
    }).catch(err => {
        console.error('Error: ', err);
    });
}

function genresLijst(genres) {
  ulGenres.innerHTML = genres
    .map(
      (genre) => `
        <div class="genres">
            <p>${genre.name}</p>
        </div>
        `
    )
    .join("");
}

function trendingLijst(trending) {
  ulTrending.innerHTML = trending
    .map(
      (trend) => `
        <div class="trending">
            <img src="https://image.tmdb.org/t/p/w500/${trend.profile_path}">
        </div>
        `
    )
    .join("");
}

function infoLijst(info) {
  ulInfo.innerHTML = 
      `
      <div class="info">
      <p>${info.original_title}</p>
      <p>${info.release_date}</p>
      <p>${info.revenue}</p>
      <p>${info.runtime}</p>
      <img src="https://image.tmdb.org/t/p/w500/${info.poster_path}">
  </div>
        `
}
