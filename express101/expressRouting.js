const express = require('express');
const { METHODS } = require('node:http');
const app = express();

// app object has a few methods:
// HTTP Verbs! REST Verbs!
// 1. get - READ
// - DEFAULT for all browsers is get
// 2. post - CREATE
// 3. delete - DELETE
// 4. put - UPDATE
// 5. all (specific to express) - I will accept any method

// Take 2 args:
// 1. path
// 2. callback to run if an HTTP request that matches THIS verb
// is made to the path in #1
app.all('/', (req,res)=>{
    res.send(`<h1>Welcome to the home page!</h1>`)
})
app.get('/', (req,res)=>{
    res.send(`<h1>Welcome to the home GET page</h1>`)
})
app.post('/', (req,res)=>{
    res.send(`<h1>Welcome to the home POST page</h1>`)
})
app.delete('/', (req,res)=>{

})
app.put('/', (req,res)=>{
    
})

app.listen(3000);
console.log("Server is listening on port 3000")