import { Express } from 'express';

const express = Express;
const https = require('https');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Set the port for the server to listen on
const PORT = 8080; // Replace with any port number you prefer
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});