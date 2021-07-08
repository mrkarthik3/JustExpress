var express = require('express');
var router = express.Router();
const request = require('request');

const apiKey = "123456789";
const apiBaseUrl = 'http://localhost:3030';
const nowPlayingUrl = `${apiBaseUrl}/most_popular?apiKey=${apiKey}`


const movies = require('../data/movies') // loading the actual data

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/most_popular', (req, res, next) => {

  // get the page variable from the query string
  let page = req.query.page;

  if (page === undefined) { page = 1;}
  
  let results = movies.filter((movie) => {
    return movie.most_popular
  })
  
  // if (req.query.apiKey != "123456789") {
  //   res.json("Invalid API Key");
  // } else {
    const indexToStart = (page-1)*20
    results = results.slice(indexToStart, indexToStart + 19)
    // results is an array. But I need to send object.
    // So, I simply do an ES6 object like this
    // console.log({ results });
    // res.json({ results : results });
    // res.end('Reponse ended.');
    res.json({
      page,
      results
    });
  // }
})

module.exports = router;
