require('dotenv').config();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const router = require('./app/router.js');
const PORT = process.env.PORT || 8427;
var app = express();

app.use('/static', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(router);
app.listen(PORT, () => {
    console.log("Server is listening on " + PORT);
})
