// server.cjs (FIXED)
const express = require('express');
const path = require('path');

const app = express();
// Use the environment port, or default to 3000
const PORT = process.env.PORT || 3000; 

// 🚨 REMOVED: const __dirname = path.resolve(); 
// The global __dirname is automatically provided here!

// Serve the static files from the 'dist' folder
// Use the built-in __dirname to construct the path
app.use(express.static(path.join(__dirname, 'dist')));

// For any other GET request, serve the main index.html file
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// Start listening on the required port
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
