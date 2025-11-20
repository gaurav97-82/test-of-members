// server.js (CommonJS Syntax)
const express = require('express');
const path = require('path');

const app = express();
// Use the environment port, or default to 3000 for local testing
const PORT = process.env.PORT || 3000; 

// Find the current directory path
const __dirname = path.resolve();

// Serve the static files from the 'dist' folder (Vite's build output)
app.use(express.static(path.join(__dirname, 'dist')));

// For any other GET request, serve the main index.html file
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// Start listening on the required port
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
