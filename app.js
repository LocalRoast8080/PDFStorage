const express = require("express");
const path = require('path');


const app = express();
//app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs')


// global.__basedir = __dirname;

const initRoutes = require("./routes/index.js");

initRoutes(app);

let port = 8080;
app.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
});