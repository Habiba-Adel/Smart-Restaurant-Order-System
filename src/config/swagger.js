//now the steps is first to install the supported package of swagger with express 
//and then the second task is to define the swagger configuration and that what we will make here

const swaggerJSDoc = require('swagger-jsdoc');

//and then making the defination
const swaggerDefinition = {
openapi: '3.0.0',
info: {
title: 'My smart restaurant project API ',
version: '1.0.0',
description: 'this is the swagger documentation for all the api boundries we define it before in the documentation in the repo',
},
components:{
securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
},
};

//now after define the swagger and its title and its description and the openapi version and all info 

//here the first challange that in my project our arch is modules so there is no routes folder that hasing all the routes file how we will make it to read the route file fro =m each module folder?
//yo solve this problem we will use the glob pattern and the ** means to enter into this folder and see if any * file but ends with the ,routes.js
const options = {
definition:swaggerDefinition,
apis: ['./src/modules/**/*.routes.js'], // here i need to give it the path to enable it to read all the routes in the project to can show them in the page
};

//here after reading the comments and convert them into swagger json
const swaggerSpec = swaggerJSDoc(options);
//and then export it to can read it in the app file normally 
module.exports = swaggerSpec;



//--------------------------------------------------------------
/*
the importande of the swagger-isdoc is it is a library that read the comments we will make it in the routes files before each code block and 
then it convert it to json to then in the final making and building the swagger documentation 
and cause i use in the swagger comments the tokens by using and defining the security by using the beareerAuth i need to define this bearerAuth here to be appeared

*/