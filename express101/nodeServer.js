// http is native to to NodeJS. We just have to ask for it.
const http = require("http");

// fs = file system module. fs is built into Node.
const fs = require("fs");
// fs gives access to THIS computer's file system.
// This simply gives access to files on the SERVER! not Client.
// Therefore this is not a security risk..

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

const server = http.createServer((req, res) => {
  console.log(`Request was made to : ${req.url}`);
  // console.log(req)
  // res = Response object -> it is our way of responding to the requester.

  // http message / response contains
  // 1. Start Line (Node takes care of this)
  // 2. header
  // 3. body

  // header is written using writeHead method.
  // writeHead takes 2 args:
  // 1. status code
  // 2. object for the mime-type
  // mime-type simply describes the type of content... that's all.
  // body is written using write method

  // header describes the type of content in body and browser will display accordingly.
  //   res.writeHead(200, { "content-type": "text/html" });
  //   res.write("<h1>Hello, World</h1>");
  //   res.end();

  // You need to mention res.end() to let the browser know that the
  // response is completed.

  // Above response is common for ALL URLs and ALL Request Types. This is not practical.
  // A Server doesn't send back files (technically speaking), it sends back responses.
  // I need to serve different response based on the URL and Request Types ...

  /**
   * ALL Links mentioned to display a page generate a GET request.
   * DOM creates those GET requests to get those files and display the page correctly.
   * That is why the css file and image generate new requests on port 3000.
   * So, all such requests to individual files are to be handled one-by-one if http module of NodeJS is used
   * This is a HUGE issue for big websites with thousands of files.
   *
   * Handling each request by writing headers and body for them like this is unmanageable for big websites.
   *
   * With http module it is our job to send res based on the req
   *
   * Express module solves this problem elegantly.
   */
  if (req.url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    const homepageHTML = fs.readFileSync("./express101/node.html");
    // Saving contents of HTML file into a 'const'.
    res.write(homepageHTML);
    res.end();
    // res.end() lets browser know that response ended
  } else if (req.url === "/node.svg") {
    res.writeHead(200, { "content-type": "image/svg+xml" });
    // If you are not sure about mime-type of a particular type of file, google it!
    const image = fs.readFileSync("./express101/public/node.svg");
    res.write(image);
    res.end();
  } else if (req.url === "/styles.css") {
    res.writeHead(200, { "content-type": "text/css" });
    const css = fs.readFileSync("./express101/public/styles.css");
    res.write(css);
    res.end();
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write(`<h4>Sorry, this isn't  the page you are looking for!</h4>`);
    res.end();
  }
});

/**
 * createServer returns an object with a listen method.
 * listen method takes 1 argument
 * 1. port to listen for http traffic on
 *
 * Port used is generally above 1000.
 * ports below 1000 need special permissions.
 * Unless one is root user, they are not accessible.
 *
 * Just use any port above 1000
 *
 */

server.listen(3000);

/**
 * Whenever this port gets a HTTP request (of any type),
 * note that there is a server running behind it...
 * It will receive the request object that has info
 * about the requester/client.
 *
 * Now, the Node Server needs to respond to indicate
 * that the request is served. That is done with 'res' object.
 *
 * Note that the server is listening for HTTP traffic.
 */
