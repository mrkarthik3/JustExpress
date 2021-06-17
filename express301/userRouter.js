const express = require('express')
let router = express.Router();

// router.use works the same way as app.use does, but it is specific to THIS router
// router.use()


function validateUser(req, res, next) {
    // Let's say I did some DB check or external Auth like OAuth
    res.locals.validated = true;
    console.log("validated!")
    next();
}

// validateUser, is a middleware that will ONLY be added to this router.
// In other words, the main router does not know about it.

router.use(validateUser)


/**
 * This is user Router.
 * 
 * Although there is '/' here... 
 * As I am using '/admin' for this router...
 * the '/' mentioned here is equal to '/admin'...
 * Understand that!!
 */

router.get('/', (req, res, next) => {
    res.json({
        msg: "User Router works"
    })
})


module.exports = router;
// This is NodeJS way of exporting module.