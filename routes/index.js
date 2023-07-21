const express = require('express');

// Import files containing routes
const notesRouter = require('./notes');

// Create an instance of express
const app = express();

app.use('/notes', notesRouter);

module.exports = app;