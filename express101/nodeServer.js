// http is native to to NodeJS. We just have to ask for it.
const http = require('http');

// fs = file system module. fs is built into Node.
const fs = require('fs');
// fs gives access to THIS computer's file system.

/**
 * The 'http' module has a createServer method 
 * that takes 1 argument
 * 1. Callback. This callback takes 2 args: req, res
 * These are both objects.
 * 
 * The req (request) object contains plethora of info
 * about the client who is requesting (ip address, url, user-agent etc..)
 * 
 * res (response) is what the server responds with.
 * 
 * Generally, we get information from the req object and
 * add information to the res object.
 */

const server = http.createServer((req,res) => {
    console.log(`Request was made to : ${req.url}`)
    // console.log(req)
    // res = our way of responding to the requester.
    
    // http message / response contains
    // 1. Start Line (Node takes care of this)
    // 2. header
    // 3. body
    
    // writeHead takes 2 args:
    // 1. status code
    // 2. object for the mime-type    
    //body is written using write method
    // res.write(`<h1>This is the homepage!</h1>`)
    if(req.url === '/') {
        res.writeHead(200, {"content-type": "text/html"})
        const homepageHTML = fs.readFileSync('./express101/node.html')
        res.write(homepageHTML)
        res.end();
        // Let browser know that response ended
    } else if(req.url === '/node.svg') {
        res.writeHead(200, {"content-type": "image/svg+xml"})
        const image = fs.readFileSync('./express101/node.svg')
        res.write(image)
        res.end();
    } else if(req.url === '/styles.css') {
        res.writeHead(200, {"content-type": "text/css"})
        const css = fs.readFileSync('./express101/styles.css')
        res.write(css)
        res.end();
    }
    else {
        res.writeHead(404, {"content-type": "text/html"})
        res.write(`<h4>Sorry, this isn't  the page you are looking for!</h4>`)
        res.end();
    }
});

/**
 * createServer returns an object with a listen method.
 * listen takes 1 argument
 * 1. port to listen for http traffic on
 * 
 * Port used is generally above 1000.
 * ports below 1000 need special permissions.
 * Unless one is root user, they are not accessible.
 * 
 * Just use any port above 1000
 * 
 */

server.listen(3000)