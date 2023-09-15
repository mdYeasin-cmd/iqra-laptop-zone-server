const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const { consoleMessageColor } = require('./utils/consoleMessages');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// all route of app
app.use('/api/v1.0/categories', require('./routes/v1.0/categories.router'));
app.use('/api/v1.0/users', require('./routes/v1.0/users.router'));
app.use('/api/v1.0/products', require('./routes/v1.0/products.router'));
app.use('/api/v1.0/orders', require('./routes/v1.0/orders.router'));
app.use('/api/v1.0/sellers', require('./routes/v1.0/sellers.router'));
app.use('/api/v1.0/buyers', require('./routes/v1.0/buyers.router'));

// testing route
app.get('/', (req, res) => {
    res.send('Iqra Laptop Zone server is running.')
});

// 404 route 
app.all("*", (req, res) => {
    res.send("No route found");
});

// global error handler
app.use(errorHandler);

// app listen here
app.listen(port, () => {
    console.log(consoleMessageColor(`Iqra Laptop Zone server is running on port ${port}`));
});

// if express not handle any error then this will excute and close the app
process.on("unhandledRejection", (error) => {
    console.log(error.name, error.message);
    app.close(() => {
        process.exit(1);
    });
});