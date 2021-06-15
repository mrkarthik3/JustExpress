/**
 * Networking - HTTP and TCP/UDP
 * Stateless
 * Connectionless
 * flexible
 *
 * -HTTP message
 * --START LINE
 * ---req: GET /blog http/1.1
 * ---res: http:/1.1 200 OK
 * --headers
 * --- {key:values}
 * ----content-type : text/html
 * ----content-type : application/json
 * ----Cache-Control : public, max-age=0
 * ----Date: Date and time is shown here
 * --BLANK LINE
 * --body
 * ---STUFF - HTML, 4K VIDEO (BINARY), IMAGES...
 */

/**
 * NODE SERVER
 *
 * -write headers
 * -write body
 * --used the fs module
 * -close connection
 * - server.listen
 * - 3000
 * - req, res
 *
 *
 * EXPRESS Version
 *
 * - Express IS NodeJS
 * - app === express() === createApplication()
 * - server.listen became ---> app.listen()
 * - router
 * -- app.get, app.post, app.all etc
 * - served up static files with express.static('public')
 *
 * Express 201:
 *
 * - Middleware = Any function that has access to req, res and next
 * - The request and response objects simply contain the HTTP message
 * - HTTP message has startline,headers, blankline and body.
 * - Thus req and res have the same content in object format.
 *
 * -- networking on the outside, node/express development on the inside
 * -- app.use, anytime you see a callback or a function with (req, res, next) inside
 * --- next() is the way to move a piece of middleware forward
 * --express.json()
 * --express.urlencoded()
 * -- Above two middleware create req.body using the body-parser package.
 * -- Without the two, req.body is undefined.
 * -- Any information passed to the server (via any http request) is stored
 * -- into req.body because of the above two middleware functions.
 *
 * -- helmet() - 3rd party module that prevents attacks that modify headers.
 *
 *
 * Request
 * req.ip - contains requesters IP
 * req.path - contains requested path
 * req.body - parsed data
 *
 * Response
 * res.send() res.end() - send text/html or end response without any message.
 * res.end() is generally used to initiate a process upon receiving a request but where there is no need to respond.
 * So no response is sent.
 *
 * res.sendFile - send  file
 * res.locals - is available on the current request response cycle to put data on it and for use by others !
 * res.json() or res.jsonp() - sends json back as application/json
 *
 *
 */
