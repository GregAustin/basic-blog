const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const HttpError = require('./models/http-error');
const blogRoutes = require('./routes/blog-routes');
const usersRoutes = require('./routes/users-routes');

const app = express();

app.use(bodyParser.json());

// Serve front end static content from public dir. Only needed if API server is also web server.
// app.use(express.static(path.join('public')));

// Middleware to set headers. Needed if client and server are on separate hosts.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.use('/api/blogs', blogRoutes);
app.use('/api/users', usersRoutes);

// Serve index.html on any route that isn't covered by the preceding middleware.
// This is so we can still load index.html on routes other than '/' (e.g. if we refresh on '/auth').
// Only needed if API server is also web server.
// app.use((req, res, next) => {
//   res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
// });

// Error handling middleware. Note: placed after other routes so is only reached if no response has been sent yet.
app.use((req, res, next) => {
  // Add error so that error handling below will be triggered.
  const error = new HttpError('Could not find this route: ' + req.url, 404);
  throw error;
});

// Default error handling. Only runs if an error is included in arguments.
app.use((error, req, res, next) => {
  // Check if error has already been sent
  if (res.headerSent) {
    return next(error);
  }
  // Set error code from error object or default to 500 (server error).
  res.status(error.code || 500);
  //Send error message
  res.json({ message: error.message || 'An unknown error occured.' });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.c9n4z99.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });
