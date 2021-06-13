const express = require("express");
const app = express();

// app comes with a "use" method
// "USE" is for mounting middleware functions most of the time..
// It is mostly used for middleware.
// use takes 1 arg (right now)
// 1. the middleware you want to run

/** The directory you want to make public is passed
 * as argument into express.static()
 *
 * This will load all files that are inside public folder.
 * All routing & serving of files inside it will be handled automatically.
 *
 * This is a GIANT LEAP from handling every file manually using Node Server.
 * Express server is therefore SLICK!
 */
app.use(express.static("./express101/public"));

/**
 * To access those public files.. say 'styles.css'
 * You do NOT need to go to http://localhost:3000/public/styles.css
 * You can DIRECTLY access it via http://localhost:3000/styles.css
 *
 * This is how it works... So note that!
 * You DONT need to got into public folder to access public files.
 * They behave as if they are in root folder.
 * This is magic of Express
 */

/** You can have as many public folders you want */
app.listen(3000);
console.log("Server is listening on port 3000...");
