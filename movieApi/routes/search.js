var express = require('express');
var router = express.Router();

const movies = require('../data/movies')
const people = require('../data/people')

/* GET search page. */
// /search/...

function queryRequired(req, res, next) {
    const searchTerm = req.query.query
    if (!searchTerm) {
        res.json({msg: "Query is required!"})
    } else {
        next()
    }
}

router.use(queryRequired);
// This middleware will be used by ALL routes in THIS router

// GET search/movie
router.get('/movie',  (req, res, next) => {
    const searchTerm = req.query.query;
    const results = movies.filter((movie) => {
        // Convert incoming json data field and searchTerm to Lower Case for better matching. 
        // Because includes by default is case sensitive.
        let found = movie.overview.toLowerCase().includes(searchTerm.toLowerCase()) || movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        return found
    })
    res.json({results})
})

// GET search/people
router.get('/people', (req, res, next) => {
    const searchTerm = req.query.query;
    const results = people.filter((person) => {
        // Convert incoming json data field and searchTerm to Lower Case for better matching. 
        // Because includes by default is case sensitive.
        let found = person.name.toLowerCase().includes(searchTerm.toLowerCase())
        return found
    })
    res.json({ results })
})
module.exports = router;
