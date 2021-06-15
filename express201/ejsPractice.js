const path = require("path");
const express = require("express");
const app = express();

// Always use helmet
const helmet = require("helmet");

// app.use(helmet());

// This Logs the default Content Security Policy Directives
// console.log(helmet.contentSecurityPolicy.getDefaultDirectives());

// OVERRIDE the default 'script-src' directive to 'unsafe-inline'
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "script-src": ["'unsafe-inline'"],
    },
  })
);

// This will disable CSP all together.
// app.use(
//   helmet({
//     contentSecurityPolicy: false,
//   })
// );

// Serve static files
app.use(express.static("./express201/public"));
// Parse json and urlencoded data into req.body
app.use(express.json());
app.use(express.urlencoded());

function validateUser(req, res, next) {
  // ... validated logic
  res.locals.validated = true;
  next();
}

app.use(validateUser)
// Above code is same as 
app.use((req, res, next) => {
  // ... validated logic
  res.locals.validated = true;
  next();
})

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.get("/about", (req, res, next) => {
  res.render('about', {});
})

app.get("/", (req, res, next) => {

  /**
 * TO USE RES.RENDER...
 *
 * 1. Express as we know it happens... This file
 *
 * 2. We define a "View Engine"
 * Eg. EJS, Mustache, Handlebars, Jade/Pug
 *
 * 3. Inside one of our routes, we have a res.render
 *
 * 4. We pass that res.render 2 things
 * (A) THE FILE WE WANT TO USE
 * (B) THE DATA WE WANT TO SEND TO THAT FILE
 * This data needs to be in Object/JSON format.
 * This object is appended to res.locals
 *
 * 5. Express uses the node module for our specified view engine and parses the file.
 * That means, it takes HTML/JS/CSS and combines with whatever "Node" there is in the file.
 *
 * 6. Final result of this process is a compiled product of the things the browser will read
 * HTML,CSS and JS
 */
  
  // The data in second argument (must be an object/json) is appended to res.locals
  res.render("index", {
    msg: "Success!",
    msg2: "Success 2!",
  });
});



app.listen(3000);