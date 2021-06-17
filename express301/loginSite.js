const path = require('path')

const express = require('express')
const app = express()

const cookieParser = require('cookie-parser')

const helmet = require('helmet')
app.use(helmet())


// app.use(express.static('public'))
// This path is wrong... So, it wont work
// Below path is correct.
app.use(express.static("./express301/public"));

app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use((req, res, next) => {
    if (req.query.msg === 'fail') {
        res.locals.msg = "Sorry, this username and password combination does not exist"
    } else {
        res.locals.msg = ``
    }

    // send me to the next piece of middleware!
    next()
})

app.get('/', (req, res, next) => {
    res.send("Sanity Check")
})
app.get('/login', (req, res, next) => {

    // Instead of using above middlware for querystring check, I could do like below also
    const msg = req.query.msg;
    if (msg === 'fail') {
        // run some other function ...
    }
    // the req object has a query property in Express
    // the req.query is an object with a property of every key in the query string.
    // the query string is where you put insecure data.
    console.log(req.query);

    // req.query.msg = fail
    // req.query.test = hello
    res.render("login")
})


// This POST route is only for saving/checking user inputted data 
// and re-direct to appropriate page.
app.post('/process_login', (req, res, next) => {
    // req.body is made by urlencoded, which parses the http message for sent data
    const password = req.body.password;
    const username = req.body.username;
    // Check the DB to see if user credentials are valid
    // If they are valid...
    // -- Save their username in a cookie.
    // -- Send them to the welcome page.
    // You can do the same thing with "Sessions"

    /**
     * Cookie data is stored entirely on the browser.
     * The browser will send this cookie data everytime a request is made to server.
     * 
     * Session data is stored on the Server and the browser is given a key for that data.
     * Everytime a browser sends a request, that key is sent to server.
     * Sessions is not included with Express.
     * Cookies are built-in to Express.
     */


    if (password === 'x') {
        // res.cookie takes 2 args
        // 1. name of the cookie
        // 2. value to set it to 

        res.cookie('username', username);
        // You can set only one cookie at a time.
        // res.redirect() takes 1 arg....
        // 1. where to send the browser.

        // By creating a cookie like this... and adding to response object..
        // I can recognize that a particular user is logged-in from ANY ROUTE...
        // because... this cookie is sent to browser for any subsequent request made to browser.

        // So... I created a cookie... added that to response... this saves a cookie on browser with some data
        // Whenever the browser sends new requests, this cookie is sent to server. So, that browser is identifiable.
        // This is how cookies work. 

        // res.redirect('/welcome');
        res.redirect('/welcome');

    } else {
        // The "?" is a special character in URL.
        // Everything after ? is part of query string.
        // There are key-value pairs after the "?"
        // Everything before ? is part of actual domain.
        // There are 2 key-value pairs separated by a &
        res.redirect('/login?msg=fail&test=hello')
        // Here I constrcuted a custom URL with key value pairs and did a redirect to it.
        // so that I can use them later... to show some sort of message...
        // These query string's key value pairs are stored on the req.query object.
    }
    // res.json(req.body)
})

app.get('/welcome', (req, res, next) => {
    // There can be many cookies on req.cookies... Hence the plural cookie(s) name on req object.
    // req.cookies object will have a property for every created (named) cookie
    // that has been set.
    // cookies are NOT part of the req.body. Therefore the urlencoded is not useful now.
    // cookies are sent through the HTTP message, same way the data is sent from the form.
    // We need cookie-parser external module to parse the cookies sent by the browser.
    // cookies are built-in part of the request and response object.
    res.render('welcome', {
        // req.body is not valid on this route... So, this will not work.
        // req.body will work ONLY on POST route declared before... for saving form data into variables.
        // username: req.body.username
        // This is a NEW... GET request... 
        // As HTTP requests are stateless, the req.body is INVALID
        // If the user successfully logged-in, I need to access the saved data from cookies from now...

        username: req.cookies.username
        // This will work as I saved username value on a cookie with name 'username' earlier. 
    })
})


/* UNDERSTANDING PARAMS OBJECT...
// HANDLING ROUTES LIKE THIS WHERE THERE IS A COMMON PATTERN IS CUMBERSOME

app.get('/story/1', (req, res, next) => {
    res.send('<h1>Story 1</h1>');
})
app.get('/story/2', (req, res, next) => {
    res.send('<h1>Story 2</h1>');
})
app.get('/story/3', (req, res, next) => {
    res.send('<h1>Story 3</h1>');
})
*/

/** GETTING DATA FROM PARAMS
 * In a route, anytime something has a ":" (colon) in front, it is a wildcard!
 * wildcard, will match anything in that slot
*/
/** Below is the proper way. 
 * The colon followed by storyId means...
 * After the /story/ part of URL there could be anything...
 * That anything after /story/ part of URL is stored into req.params object with property storyId
 * That is how req.params works...
*/

// app.param() takes 2 args
// 1. param to look for in the route
// 2. the call back to run (with the usuals)

// With app.param.... You can 'GRAB' (identify) the req.params.id (here in this case)
// This can happen (like shown below) BEFORE the actual route is run...
app.param('id', (req, res, next, id) => {
    console.log("Params called : " + id)

    // if id has something to do with stories...

    // if id has something to do with blog...

    next();
})

// Practically speaking... the routes look like below....
// app.get('/user/:uid',....)
// app.get('/user/admin/:uid',....)
// app.get('/user/profile/:uid',....)



app.get('/story/:id', (req, res, next) => {
    // the req.params object always exists (it is part of Express)
    // it will have a property for each wildcard in the route.
    // This route is triggered... whenever a GET request is received to a URL with structure like /story/*
    // Any thing can take the place of * in the URL
    res.send(`<h1>Story - ${req.params.id}</h1>`)
    // res.send('<h1>Story 1</h1>');
})
// Below will NEVER run because it matches above (without next() ). Only the first one runs.
// Although you named the params differently... it will be treated as same due to wildcard!
// So you can use only one!
// One trick to overcome this is using next() in previous route... but using it is pointless for routes. 
// As we want routes to be unique and avoid conflicts.
// app.get('/story/:blogId', (req, res, next) => {
//     // the req.params object always exists (it is part of Express)
//     // it will have a property for each wildcard in the route.
//     // This route is triggered... whenever a GET request is received to a URL with structure like /story/*
//     // Any thing can take the place of * in the URL
//     res.send(`<h1>Story - ${req.params.storyId}</h1>`)
//     res.send('<h1>Story 1</h1>');
// })

app.get('/story/:storyId/link', (req, res, next) => {
    // Here I have only ONE wildcard... storyId that is stored on req.params object
    // after the wildcard is over... the last part of the URL.. MUST be "link".
    // This route is triggered .... whenever a GET request is received to a URL with structure like /story/*/link
    // Any thing can take the place of * in the URL
    res.send(`<h1>Story - ${req.params.storyId} - This must be undefined >> ${req.params.link}</h1>`)
    // res.send('<h1>Story 1</h1>');
})
app.get('/story/:storyId/:link', (req, res, next) => {
    // Here I have Two wildcards... 
    // So TWO PROPERTIES 'storyId' and 'link' are stored on req.params object
    // This route is triggered .... whenever a GET request is received to a URL with structure like /story/*/*
    // Any thing can take the place of * in the URL
    res.send(`<h1>Story - ${req.params.storyId} - ${req.params.link}</h1>`)
    // res.send('<h1>Story 1</h1>');
})

app.get('/statement', (req, res, next) => {
    // This will render the statement IN THE BROWSER
    // res.sendFile(path.join(__dirname, 'userStatments/BankStatementChequing.png'))
    // app has a download method! Takes 2 args
    // 1. filename
    // 2. optionally, what you want the filename to download as
    // It can take 3rd arg also.
    // 3. callback which comes with the error object.

    // download is setting the headers
    // 1. content-disposition to attachment, with a filename of second arg.
    // Here I've hardcoded the name(2nd arg) of the download file, but you could make it dynamic with date... etc...
    res.download(path.join(__dirname, 'userStatments/BankStatementChequing.png'), "Jim's statement.png", (error) => {
        // If there is an error in sending the File, headers may already be sent
        // console.log(error);
        // res.headersSent is a bool, it is true if headers are already sent.
        if (error) {
            if (!res.headersSent) {
                res.redirect('/download/error')
            }
        }
    })
    
    
    // res.download is changing the HTTP header 
    
    // you can manually set file headers and use res.sendFile() to make the browser download the file.
    // res.set('Content-Disposition', 'attachment')
    // res.sendFile(path.join(__dirname, 'userStatments/BankStatementChequing.png'))
    
        // If you have a set of headers that you want to set manually and dont want to use res.download and res.sendFile,
        //     then you can use res.attachment.It will set header of only 'content-disposition' to 'attachment' and
        // will not touch other headers.
    
    res.attachment(path.join(__dirname, 'userStatments/BankStatementChequing.png'), "Jim's statement.png")
    // attachment will only set headers to 'attachment'. 
    // IF you provide a file, it will also set the file Name.

})



app.get('/logout', (req, res, next)=> {
    // res.clearCookie() takes 1 arg
    // 1. The cookie to clear (by name)
    res.clearCookie('username')
    // By removing the cookie with name 'username',
    // The browser will no longer be able to send a cookie to communicate with server...
    // So it can no longer recognize that the user logged -in...
    // So, this is the process of logging out a logged-in user... deleting the cookie!
    res.redirect('/login')
})

app.listen(3000);
console.log("Server is listening on Port 3000...");