// Load the Express library so we can build a web server
import express from "express";
// Load morgan, a ready-made middleware that logs every request
import morgan from "morgan";

// Make a new Express app (this is our server)
const app = express();
// The port number the server listens on (http://localhost:3000)
const port = 3000;

// Middleware: morgan prints one line per request in the "dev" format,
// like  GET / 200 3.1 ms - 5  (method, path, status, time, size)
app.use(morgan("dev"));

// Route: when the browser asks for the home page, send back "Hello"
app.get("/", function (req, res) {
  res.send("Hello");
});

// Start the server, and print a message once it is listening
app.listen(port, function () {
  console.log("Listening on http://localhost:" + port);
});
