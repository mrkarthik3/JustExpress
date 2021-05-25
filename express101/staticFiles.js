const express = require('express')
const app = express();


// app comes with a use method
// it is mostly used for middle ware.
// use takes 1 arg (right now)
// 1. the middleware you want to run

app.use(express.static('./express101/public'))


app.listen(3000)
console.log('Server is listening on port 3000...');