// Load the Express library so we can build a web server
import express from "express";
// Load morgan, a ready-made middleware that logs every request
import morgan from "morgan";

// Make a new Express app (this is our server)
const app = express();
// The port number the server listens on (http://localhost:3000)
const port = 3000;

// Log every request in the terminal (GET / 200 3.1 ms - 5)
app.use(morgan("dev"));
// Turn the form data the browser sends into an object on req.body
app.use(express.urlencoded());
// Send files from the public folder (the form in public/index.html)
app.use(express.static("public"));

// Turns characters that mean something in HTML into harmless text,
// so whatever someone types can't run as code on our page.
// This is the same fix as using textContent instead of innerHTML in Week 3.
function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

// Middleware for /submit only: builds the band name, or stops with a 400 if a box was empty.
function bandNameGenerator(req, res, next) {
  // Pull the two answers out of the form data
  const street = req.body.street;
  const pet = req.body.pet;
  // If either one is missing, answer with a 400 (bad request) and stop here.
  // return means next() is never called, so the route below never runs.
  if (!street || !pet) {
    res.status(400).send("Both names are needed. <a href='/'>Try again</a>");
    return;
  }
  // res.locals is a place to leave things for the next function in the chain
  res.locals.bandName = street + " " + pet;
  // Carry on to the route
  next();
}

// Route: the form POSTs to /submit. bandNameGenerator runs first, then this function.
app.post("/submit", bandNameGenerator, function (req, res) {
  // Print the band name in the server terminal
  console.log("Band name:", res.locals.bandName);
  // Send an HTML page back, with the band name made safe by escapeHtml
  // The stylesheet link at the start gives the answer page the same style as the form
  res.send("<link rel='stylesheet' href='/style.css'><h1>Your band name is:</h1><h2>" + escapeHtml(res.locals.bandName) + " ✌️</h2><a href='/'>Another</a>");
});

// Start the server, and print a message once it is listening
app.listen(port, function () {
  console.log("Listening on http://localhost:" + port);
});
