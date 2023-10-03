const express = require('express');
const app = express(); //inicializa la libreria

app.use(express.json()); //para trabajar con json
app.use(express.urlencoded({extended: false})); //trabajar con formularios
//mediante url

app.use(require('./controllers/authController'));

module.exports = app;