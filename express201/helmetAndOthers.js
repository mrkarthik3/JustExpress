const express = require("express");
const app = express();
const helmet = require("helmet");

app.use(helmet());
// Helmet can help protect your app from some well-known web
// vulnerabilities by setting HTTP headers appropriately.

// Using helmet to secure Express Apps is considered a best-practice.

// Ensure correct path for public folder based on your
// node packages installation and package.json file!
// Just using 'public' will not work because of my folder structure in
// this project.
// The modules are installed outside the express201 folder.
// So, you have to mention path starting from the place where packages are installed.
app.use(express.static("./express201/public"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/** req.body is generated only because of above two middleware.
 * If they were not present, body property will not exist.
 *
 * json() will create a body property which is an empty object
 * and add it to the (POST) request object.
 *
 * urlencoded() will add the actual data of the POST request
 * on to this empty body property created by json()
 * *
 * They both will help us to parse the body.
 * By default data is sent to server with header of >> “x-www-form-urlencoded”
 *
 * These two middleware will collect ANY type of submitted data and
 * parse it for you and give it to you in JSON format.
 * SO, THEY ARE VERY IMPORTANT.
 */

/** So, it is considered a best practice to add these 3 middleware
 * in every Express application to avoid frustration along the line.
 *
 * 1. static
 * 2. json
 * 3. urlencoded
 *
 */
app.post("/ajax", (req, res) => {
  console.log(req);
  //   res.send("Test");
  res.json("Test");
  /**
   * Note that Express is autohandling the mime-type
   * That is the case here due to using res.send().
   * The content is set as text/html.
   *
   *
   *
   * But for the console.log to work in the ajax.html, the content
   * should not be text/html. It must be of JSON type.
   *
   * So, in such cases, we have to manually set the mime-type.
   *
   * Using res.json() will set mime-type to application/json.
   * That solves the issue!!
   *
   *
   *
   */
});

app.listen(3000);
