// Basic Node.js HTTP Server

// Import the built-in http module
const http = require("http");

// Define the port number
const PORT = 5000;

// Create HTTP server
const server = http.createServer((req, res) => {
  // Set the response HTTP header with HTTP status and Content type
  res.writeHead(200, { "Content-Type": "text/plain" });

  // Send the response body "Hello, World!"
  res.end("Hello, World!");
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
