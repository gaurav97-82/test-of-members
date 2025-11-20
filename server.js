// server.js (Ensure this is in your project root)
import express from 'express';
// You may need to use 'require' and CommonJS syntax if not using Node's native module system
// const express = require('express'); 
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000; 

// ... (rest of your static file serving logic)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
