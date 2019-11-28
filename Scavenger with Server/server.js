// server.js
const express = require("express");
const app = express();

// Serve static files from the public dir
app.use(express.static("public"));

// Start the web server on port 3000
app.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
  console.log('Try visiting http://localhost:3000/hello.html');
});