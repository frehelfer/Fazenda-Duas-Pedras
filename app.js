const path = require('path');

// Third party
const express = require('express');
const expressSession = require('express-session');
const csrf = require('csurf');

// My Routes
const createSessionConfig = require('./config/session');
const db = require('./data/database');
const addCSRFMiddleware = require('./middlewares/csrf-token');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const checkAuthStatusMiddleware = require('./middlewares/check-auth');

const baseRoutes = require('./routes/base.routes');
const authRoutes = require('./routes/auth.routes');
const productsRoutes = require('./routes/products.routes');
const adminRoutes = require('./routes/admin.routes');

// Initialize the server
const app = express();

// Set EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware public static files
app.use(express.static('public'));
app.use('/products/assets', express.static('product-data'));
app.use(express.urlencoded({ extended: false })); // Extract JSON data with requests.

// Session & cookies
const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));

// CSURF protection - It need Session to work correctly
app.use(csrf());
app.use(addCSRFMiddleware)

// Check if it's login or not
app.use(checkAuthStatusMiddleware);

// Routes Use
app.use(baseRoutes); 
app.use(authRoutes);
app.use(productsRoutes);
app.use('/admin', adminRoutes);

app.use(errorHandlerMiddleware);

db.connectToDatabase()
.then(function () {
  app.listen(3000);
})
.catch(function (error) {
  console.log('Failed to connect to the database!!');
  console.log(error);
});