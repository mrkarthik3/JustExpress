var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const date = new Date(1969, 6, 20);
  // This is how I can set the Date header
  // res.set('Date', date);

  // Changed the Content-Type header
  // res.set('Content-Type', 'text/plain');
  // res.type('text/html')
  // This is shorthand way to do above one. We're just setting the mime-type!

  res.set('Cache-Control', 'no-store');
  // This is best for development. But Not for Real-World

  // fresh and stale
  // fresh returns true if it is not stale
  // console.log(req.fresh);
  // console.log(req.stale);

  console.log(req.accepts(['html', 'json']));
  // Checking if the client accepts HTML AND JSON or not...
  // Note that I am checking the request object for this data...

  res.render('index', { title: 'Express' });
});

module.exports = router;
