/**
 * i seperate the main backend file into 2 files the app.js and the server.js and that cause when i will try to making unit testing i will need to use the app.js file
 * there is will no need to the server.js file and thats why i seperate them and this is the conventions in the industry
 * this file its responsability is only to define the server and make it up to listen to requests all other things in the app.js file
 */

require('dotenv').config();

const app = require('./app');
app.listen(3000, () => {
  console.log('Server is running on port 3000');
  console.log('Swagger docs at http://localhost:3000/api/docs');
});
