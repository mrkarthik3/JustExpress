const express = require('express')
let router = express.Router();

// router.use works the same way as app.use does, but it is specific to THIS router
// router.use()


/**
 * The Router's main purpose is to modularize the code.
 * 
 * Router will deal with ROUTES ONLY... nothing else...
 */

// instead of
// app.get(...)
// app.get is application level
// we will use
// router.get(...)
// This is specific to router

router.get('/', (req, res, next) => {
    res.json({
        msg: "Router works"
    })
})

// router.all
// router.post
// router.delete
// router.put
// These are all available just like app.all, app.post, app.delete, app.put... etc...

module.exports = router;
// This is NodeJS way of exporting module.