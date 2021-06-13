// NODEJS IS the language
// Express is... Node, a node module

// This is just like
// Javascript IS the language
// React is... Javascript. It is based on Javascript. (React is a JS framework)

// Similarly Express is a NodeJS framework.

// Express is unopinionated...
// That means.... you are not forced to use any DB/FrontEnd framework... for your project
// Express works with Postgres and MySQL the same... Just as an example.

/* * ********** ADVANTAGES OF EXPRESS ********** * *
 * Express handles all of below tasks automatically...
 * writeHead , mime-types, closing connections
 *
 * Express helps to serve static files
 *
 * Middleware - Express allows us to hijack the process of
 * changing the request and response objects ANYTIME ANYWAY We want to...
 *
 * Routing...  Remove cumbersome and repetitive way of hanlding routing using
 * http module. Express makes this very simple.
 *
 * Express makes writing APIs unfairly simple and fast
 * compared to other languages and frameworks.
 *
 */

// path is native to NodeJS
const path = require("path");

// http is a native module
// const http = require('http')
// express is a 3rd party module

/**
 * Whatever is inside this express variable is what is exported by the express node module
 *
 * createApplication is being exported by the express node module
 *
 * End of the day... the return value of createApplication is being stored in 'app'
 */
const express = require("express");
// "app" is the express function (createApplication inside the Express module)
// invoked and is an Express application.

const app = express();

// serve up ALL static files! Only 1 line... MUCH MUCH better than NODEJS :P
app.use(express.static("./express101/public"));

// all is a method, and it takes 2 args:
// 1. route
// 2. callback to run if the route is requested

app.all("/", (req, res) => {
  // Express handles the basic headers of response automatically!(statuscodes,mime-type) That is Awesome!
  // console.log(`request is received from >> ${req.url} << url`)

  // "send" function is used to send basic response in express.
  // res.send(`<h1>This is the home page</h1>`)

  // read in Node.html file.
  // path.join needs absolute path of the file on my computer...
  // NOT the path relative to server.
  // I can get absolute path like this.
  console.log(path.join(__dirname + "/node.html"));
  res.sendFile(path.join(__dirname + "/node.html"));
  // Express handles the end of response! Awesome!
});

// '*' means... all URLs are handled here...
app.all("*", (req, res) => {
  res.send("<h1>Sorry, this page does not exist</h1>");
});

app.listen(3000);
/** listen can take second argument... a call back that will run one time
 * Instead of using a callback, here, I am just logging below separately.
 */
console.log("The servers is listening on port 3000");
