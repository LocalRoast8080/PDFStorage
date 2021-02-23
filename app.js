const express = require("express");
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser')
require('dotenv').config()
const initRoutes = require("./routes/index.js");
const { parse } = require("path");
const db = require('./db/index')
const utilities = require('./utilities')
const app = express();


app.set('view engine','ejs')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

initRoutes(app);

let port = 8080;
app.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
});