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

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.get("/about", (req, res, next) => {
  res.render('about', {});
})

app.get("/", (req, res, next) => {


  
  // The data in second argument (must be an object/json) is appended to res.locals
    res.render("index", {
        countries: [
            {
                name: "Russia",
                capital: "Moscow",
                western: false
            },
            {
                name: "England",
                capital: "London",
                western: true
            }
        ],
    msg: "Success!",
    msg2: "Success 2!",
  });
});



app.listen(3000);