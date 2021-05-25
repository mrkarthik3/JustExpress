// NODEJS IS the language
// Express is Node, a node module

// This is just like 
// Javascript is the language 
// React is Javascript. It is based on Javascript. (React is a JS framework)

// Similarly Express is a NodeJS framework.

// Express is unopinionated...
// That means.... you are not forced to use any DB/FrontEnd framework... for your project
// Express works with Postgres and MySQL the same... Just as an example. 

// http is a native module
// const http = require('http')
// express is a 3rd party module
const express = require('express');
// "app" is the express function (createApplication inside the Express module)
// invoked and is an Express application.
const app = express();

// all is a method, and it takes 2 args:
// 1. route
// 2. callback to run if the route is requested

app.all('*',(req,res) =>{
    // Express handles the basic headers automatically!(statuscodes,mime-type) Awesome!
    // console.log(`request is received from >> ${req.url} << url`)
    res.send(`<h1>This is the home page</h1>`)
    // Express handles the end! Awesome!
});

app.listen(3000);
console.log("The servers is listening on port 3000");