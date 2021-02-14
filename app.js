const express = require("express");
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser')
require('dotenv').config()

const db = require('./db/index')
const utilities = require('./utilities')

const app = express();
app.set('view engine','ejs')

const initRoutes = require("./routes/index.js");
const { parse } = require("path");
initRoutes(app);

app.use(bodyParser.json());

// db.testCon()
// const word = 'Barbara Bregstein - Complete Spanish Step-By-Step - The Fastest Way to Achieve Spanish Mastery-McGraw-Hill Education (2016)-1612655125161-594847145.pdf'
// const regex= /([0-9]{9}[.])/
// const fileId = word.match(regex)
// let result = path.parse(fileId[0])
// console.log(result.name)



let port = 8080;
app.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
});