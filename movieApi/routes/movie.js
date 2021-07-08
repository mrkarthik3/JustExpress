var express = require('express');
var router = express.Router();

const movieDetails = require('../data/movieDetails');

function requireJSON(req, res, next) {
    if (!req.is('application/json')) {
        // Note: req.is will be null if the body is empty even if you
        // mentioned application/json in headers.
        res.json( {"msg": "Content type must be application/json"})
    } else {
        next()
    }
}

/* GET Movies page. */
// This Router applies to all URLs that have /movie/...

router.param(('movieId'), (req, res, next) => {
    // if only certain apikeys are allowed to hit movieId
    // update the db with analytics data
    console.log("Someone hit a route that used the movieId wildcard!");
    next();
})


// GET /movie/top_rated

router.get('/top_rated', (req, res, next) => {

    let page = req.query.page;
    if (!page) { page = 0; }
    const results = movieDetails.sort((a, b) => {
        return b.vote_average - a.vote_average;
    })
    let indexToStart = (page - 1) * 20;
    res.json(results.slice(indexToStart,indexToStart+19))

})

// POST /movie/{movie_id}/rating
router.post('/:movieId/rating', requireJSON, (req, res, next) => {
    const movieId = req.params.movieId;
    // console.log(req.get('content-type')) // checking content type of incoming data
    // using req.is() is another way to find content type of incoming data

    const userRating = req.body.value;
    if (userRating < 0.5 || userRating > 10) {
        res.json({ msg: "Rating must be between 0.5 and 10" });
    } else {
        res.json({
            msg: "Thank you for submitting your rating.",
            status_code: 200
        })
    }
    
})

// DELETE /movie/{movie_id}/rating

router.delete('/:movieId/rating', requireJSON, (req, res, next) => {
    res.json({msg: "Rating deleted!"})
})


// GET /movie/movieId

// Since this is a wildcard route, it MUST be at the bottom in this router file

router.get('/:movieId', function (req, res, next) {
    const movieId = req.params.movieId; // this will be string.
    // Anything parsed out of the URL will be a string by default.

    const results = movieDetails.find((movie) => movie.id === parseInt(movieId))
    // Using find ES6 array method is better as...
    // 1. There will only be ONE match for an ID and...
    // 2. Find will find that FIRST match! That's all we need.
    // Filter will loop through entire array and hence not meaningful and efficient to use here.
    
    /*
    const results = movieDetails.filter((movie) => {
        return movie.id === movieId;
    })
    */
    
    // the ES6 find() will return undefined if there is no match.
    // handle that here...
    // A match is an object that resolves to true by default
    if (!results) {
        res.json({
            msg: "Movie ID is not found",
            production_companies : []
        });
    } else {
        res.json(results);
    }
});

module.exports = router;
