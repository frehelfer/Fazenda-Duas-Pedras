// Third party
const path = require('path');

const express = require('express');
const csrf = require('csurf');

// My Routes
const db = require('./data/database');
const addCSRFMiddleware = require('./middlewares/csrf-token');
const authRoutes = require('./routes/auth.routes');
const errorHandlerMiddleware = require('./middlewares/error-handler');

// Initialize the server
const app = express();

// Set EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware public static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false })); // Extract JSON data with requests.

app.use(csrf());
app.use(addCSRFMiddleware)

app.use(authRoutes);

app.use(errorHandlerMiddleware);

db.connectToDatabase()
.then(function () {
  app.listen(3000);
})
.catch(function (error) {
  console.log('Failed to connect to the database!!');
  console.log(error);
});