// Load the Express library so we can build a web server
import express from "express";

// Make a new Express app (this is our server)
const app = express();
// The port number the server listens on (http://localhost:3000)
const port = 3000;

// Middleware: read the form data a browser sends (street=Maple&pet=Biscuit)
// and turn it into an object on req.body. Without this, req.body is undefined.
app.use(express.urlencoded());

// Middleware: send any file from the public folder when the browser asks for it
// (so http://localhost:3000/ gives public/index.html)
app.use(express.static("public"));

// Route: when the form POSTs to /submit, run this function
app.post("/submit", function (req, res) {
  // Print what the form sent us in the server terminal
  console.log(req.body);
  // Send a reply back to the browser
  res.send("Got it! Look at the server terminal.");
});

// Start the server, and print a message once it is listening
app.listen(port, function () {
  console.log("Listening on http://localhost:" + port);
});
