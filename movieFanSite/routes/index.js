var express = require('express');
var router = express.Router();
const request = require('request')
// This module will "MAKE" HTTP REQUESTS to other servers!

// Below 3 lines are for connecting to TMDB
// const apiKey = "86e55bf0fa416fe8d7e8052b89be38ad";
// const apiBaseUrl = 'http://api.themoviedb.org/3';
// const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;

// Below 3 lines are for connecting to Local Server that is serving the JSON Data.
const apiKey = "123456789"
const apiBaseUrl = 'http://localhost:3030'
const nowPlayingUrl = `${apiBaseUrl}/most_popular?apiKey=${apiKey}`;

const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';

router.use((req, res, next) => {
  // Added imageBaseUrl to res.locals so that EVERY ROUTE 
  // HAS access to imageBaseUrl
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
})


/* GET home page. */
router.get('/', function (req, res, next) {
  
  // Before we render, we want to make a GET request to an API
  // to get the information. That is done using request.get()

  // request.get takes 2 args:
  // 1. it takes the URL to http "GET"
  // 2. the callback to run when the http response is received. (This callback takes 3 args)
  //   1. error (if any)
  //   2. http response by the API Server
  //   3. json/data the server sent back

  request.get(nowPlayingUrl, (error, response, movieData) => {

    // console.log("===================== The Error =====================")
    // console.log(error); // If there is no error, this will be 'null'
    // console.log("===================== The Response =====================")
    // console.log(response);
    // The actual data is present on the body property of the response.
    // It is in string format and needs to be parsed as JSON.
    // console.log(response);
    
    const parsedData = JSON.parse(movieData);

    // movieData = response.body Both are same! It is a massive string.
    // data over HTTP messages is sent as strings. Thats how HTTP works.
    // console.log(movieData);
    // console.log("===================== The Type (string) =====================")
    // console.log(typeof movieData)
    // console.log(typeof response.body)

    
    // res.json(parsedData)
    res.render('index', { parsedData: parsedData.results });
    // With This... parsedData will be added to res.locals for use in template index.
    // This is valid for '/' route ONLY! remember that!
  })
});

// /movie/:id is a wildcard route.
// that means :id is goind to be stored in... req.params.id
router.get('/movie/:id', (req, res, next) => {
  // res.json(req.params.id);
  const movieId = req.params.id;
  const thisMovieUrl = `${apiBaseUrl}/movie/${movieId}?apiKey=${apiKey}`;
  // res.send(thisMovieUrl)
  request.get(thisMovieUrl, (error, response, movieData) => {
    const parsedData = JSON.parse(movieData);
    console.log(parsedData);
    res.render('single-movie', { parsedData })
    // This is ES6 Way of passing parsedData
  })
})

router.post("/search", (req, res, next) => {
  // res.send("Sanity Check")
  const userSearchTerm = encodeURI(req.body.movieSearch);
  // The value typed in the input element has name = "movieSearch"
  // When data is sent to server... it will be stored inside req.body.movieSearch.
  // This is how it works...

  const cat = req.body.cat
  // Chosen category will be sent to server inside req.body.cat
  // This can be "movie" or "person"
  // const movieUrl = `${apiBaseUrl}/search/${cat}?query=${userSearchTerm}&api_key=${apiKey}`

  //*********************************** */
  // Use This Code Block for constructing valid URL to talk with Local API.
  let movieUrl
  if (cat === "person") {
    // for local api, the url must contain 'people' instead of 'person'
    movieUrl = `${apiBaseUrl}/search/people?query=${userSearchTerm}&apiKey=${apiKey}`
  } else {
    movieUrl = `${apiBaseUrl}/search/${cat}?query=${userSearchTerm}&apiKey=${apiKey}`
  }

  //*********************************** */

  // res.send(movieUrl)
  console.log(movieUrl)
  request.get(movieUrl, (error, response, movieData) => {
    let parsedData = JSON.parse(movieData)
    console.log(parsedData)
    // res.json(parsedData)

    if (cat === "person") {
      parsedData.results = parsedData.results[0].known_for;
    }
    res.render('index', {
      parsedData: parsedData.results
    })
  })



})

module.exports = router;
// 86e55bf0fa416fe8d7e8052b89be38ad