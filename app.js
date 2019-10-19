const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = require('./routes/commentRoute');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/', router);

module.exports = app;