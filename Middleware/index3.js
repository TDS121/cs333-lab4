// Load the Express library so we can build a web server
import express from "express";

// Make a new Express app (this is our server)
const app = express();
// The port number the server listens on (http://localhost:3000)
const port = 3000;

// Our own middleware: a function that gets the request, the response,
// and next. It runs for every request before the routes do.
function logger(req, res, next) {
  // Print which kind of request it was (GET, POST, ...)
  console.log("Request method:", req.method);
  // Print which address was asked for (/, /submit, ...)
  console.log("Request URL:", req.url);
  // Hand the request on to the next middleware or route.
  // Without this the browser waits forever, because nothing ever answers.
  next();
}

// Tell Express to use our logger for every request
app.use(logger);

// Route: when the browser asks for the home page, send back "Hello"
app.get("/", function (req, res) {
  res.send("Hello");
});

// Start the server, and print a message once it is listening
app.listen(port, function () {
  console.log("Listening on http://localhost:" + port);
});
