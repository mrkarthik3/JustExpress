const path = require("path");
const express = require("express");
const app = express();

// Always use helmet
const helmet = require("helmet");
app.use(helmet());

// Serve static files
app.use(express.static("./express201/public"));
// Parse json and urlencoded data into req.body
app.use(express.json());
app.use(express.urlencoded());

// app.set(), takes 2 arguments.
// 1. Key
// 2. Value

// You can use any ONE Templating Engine
// use "npm install pug/ejs/hbs --save" to install engine of your choice.

// This is how I am setting the Template Engine to EJS.
// app.set("view engine", "ejs");
// This is how I am setting the Template Engine to HBS.
// app.set("view engine", "hbs");
// This is how I am setting the Template Engine to PUG.
app.set("view engine", "pug");

// Explicitly setting the path of 'views' directory
app.set("views", path.join(__dirname, "views"));
// By default, Express will look for EJS/PUG/HBS templates in "views"
// directory. You can explicitly set different directory
// using above syntax.

// I could 'render' an EJS/PUG/HBS template like below..
// This "index.ejs" file with ejs extension
// This "index.hbs" file with hbs extension
// This "index.pug" file with pug extension
// is expected to be in "views" folder by default.


app.get("/", (req, res, next) => {
  // I could send text message like this
  // res.send("Sanity Check");

  // I could send JSON like this
  // res.json({
  //   msg: "Success!",
  // });
  res.render("index");
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
   *
   * 5. Express uses the node module for our specified view engine and parses the file.
   * That means, it takes HTML/JS/CSS and combines with whatever "Node" there is in the file.
   *
   * 6. Final result of this process is a compiled product of the things the browser will read
   * HTML,CSS and JS
   */
});

app.listen(3000);
