const express = require("express");
const app = express();

// Express = 2 things

// 1. Router
// 2. It is a series of Middleware that comprises a webframework

// Req --- MIDDLWARE ---> Res

/** Official Definition of Middleware Function:
 * A Middleware function is ANY function that has
 * access to req, res and next objects.
 *
 * Middleware functions allow developers to get info from request object and
 * do necessary work on response so that the info that is needed is sent as response.
 *
 * There are many such useful middleware functions.
 * Express is all about middleware functions.
 * */

// When the request comes in and before responding,
// we want to do some stuff... that is middleware.

/**
 * Req --- MIDDLWARE ---> Res
 *
 * The middleware is everything that happens between networking stuff (request and response)
 *
 * 1. Request comes in.
 * 2. We need to validate the user, sometimes.
 * 3. We need to store somethings in the DB.
 * 4. If there is data from the user we need to parse it and store it
 * 5. Response is sent.
 *
 * Functions 2,3 and 4 are done by middleware.
 */

function validateUser(req, res, next) {
  // get info out of request object
  // do some stuff with DB
  res.locals.validated = true;
  /** This locals property is pre-built and attached to every response.
   * It will live till the lifetime of this repsonse.
   * Very useful for passing data to template and ALL other middleware functions.
   *
   * All middleware functions have access to locals object, on the response object.
   * So, this locals objectcan pass data to other middeware functions.
   */
  console.log("Validated Ran");
  next();
  /** If next() is used, the next middleware function will run.
   * If not... then this will end the middleware cycle and no other middleware runs.
   */
}

// This will run validateUser on ALL paths, all methods!
app.use(validateUser);
// This will run validateUser on /admin, all methods!
app.use("/admin", validateUser);
// This will run validateUser on "/" only for GET request method!
app.get("/", validateUser);
// Above way and below way of writing middle ware are ONE AND THE SAME!!!
app.get("/", (req, res, next) => {
  res.locals.validated = true;
  console.log("Validated Ran");
  next();
});

// app.use(validateUser);

// app.use is being used at application level.
// Every route will use validateUser. In other words...
// this function (validateUser) will run for EVERY HTTP request
// Therefore... the res.locals is available to ALL subsequent middleware functions.

// app.use("/admin", validateUser);

// This will cause the validateUser to run only for "/admin" route.

/**
 * app.use() is a broader version of app.get() app.post() etc....
 *
 * app.use() does not distinguish between get/post... request types. and
 * there is no need to specify the path/route.
 *
 * For app.get()... app.post().... you will need to specify the path....
 * and they will run only for specific type of request (get/post...).
 *
 */

// app.get("/", validateUser);
// This will run validateUser only for GET requests to the '/' route

/**
 * IN ESSENCE... APP.USE() AND APP.GET()/APP.POST().... ARE....
 *
 * SIMPLY.... DIFFERENT WAYS OF WRITING MIDDLEWARE FUNCTIONS.
 */

/** BECAUSE the app.use(validateUser) causes that function to run for EVERY HTTP request,
 * and... running that causes res.locals object to be added to the response object,
 *
 * I am able to log the value of res.locals.validated from the app.get('/') function like below
 *
 * This proves that res.locals is available for other middleware functions.
 */
app.get("/", (req, res, next) => {
  res.send("<h1>Main Page</h1>");
  console.log(res.locals.validated);
  // As there is no next(), this marks the end of middleware function cycle.
});
app.get("/admin", (req, res, next) => {
  res.send("<h1>Admin Page</h1>");
  console.log(res.locals.validated);
  // As there is no next(), this marks the end of middleware function cycle.
});

app.listen(3000);
