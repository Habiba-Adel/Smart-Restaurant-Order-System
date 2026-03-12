/*
and this file its own responsability is the express setup and the routes and the middlewares 

*/


const express = require('express');
const swaggerUI = require('swagger-ui-express');//and this to make the swagger web page
const swaggerSpec = require('./config/swagger');


const {errorHandler}=require('./middlewares/error.middleware');
const app = express();

// middlewares

//we will need this one to enable it to read the request bodies
app.use(express.json());

// Swagger
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Routes
app.use('/api/v1/auth',       require('./modules/auth/auth.routes'));
app.use('/api/v1/categories', require('./modules/categories/categories.routes'));
app.use('/api/v1/menu-items', require('./modules/menu-items/menu-items.routes'));
app.use('/api/v1/stock',      require('./modules/stock/stock.routes'));
app.use('/api/v1/cart',       require('./modules/cart/cart.routes'));
app.use('/api/v1/orders',     require('./modules/orders/orders.routes'));
app.use('/api/v1/payments',   require('./modules/payments/payments.routes'));
app.use('/api/v1/reviews',    require('./modules/reviews/reviews.routes'));
app.use('/api/v1/staff',      require('./modules/staff/staff.routes'));

//in the end of the routes is to just using the error middleware
app.use(errorHandler);


module.exports=app;