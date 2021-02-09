const express = require("express");
const path = require('path');
const fs = require('fs');

const utilities = require('./utilities')

const app = express();
//app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs')

console.log(utilities.numberI())

// global.__basedir = __dirname;

const initRoutes = require("./routes/index.js");

initRoutes(app);

//reads files from folder
// fs.readdir('./uploads',function(err,files){
//     console.log(files)
// })


let port = 8080;
app.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
});