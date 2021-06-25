var express = require('express');
var router = express.Router();
const request = require('request')
// This module will "MAKE" HTTP REQUESTS to other servers!

const apiKey = "86e55bf0fa416fe8d7e8052b89be38ad";
const apiBaseUrl = 'http://api.themoviedb.org/3';
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';

router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
})


/* GET home page. */
router.get('/', function (req, res, next) {
  
  // Before we render, we want to make a GET request to an API
  // to get the information

  // request.get takes 2 args:
  // 1. it takes the URL to http "GET"
  // 2. the callback to run when the http resopnse is back. (This callback takes 3 args)
  //   1. error (if any)
  //   2. http response by the API Server
  //   3. json/data the server sent back
  request.get(nowPlayingUrl, (error, response, movieData) => {
    // console.log("===================== The Error =====================")
    // console.log(error);
    // console.log("===================== The Response =====================")
    // console.log(response);
    // The actual data is present on the body property of the response.
    // It is in string format and needs to be parsed as JSON.
    const parsedData = JSON.parse(movieData);
    // movieData = response.body Both are same!
    console.log(movieData);
    // console.log("===================== The Type (string) =====================")
    // console.log(typeof movieData)
    // console.log(typeof response.body)

    
    // res.json(parsedData)
    res.render('index', {parsedData: parsedData.results});
  })
});

module.exports = router;
// 86e55bf0fa416fe8d7e8052b89be38ad