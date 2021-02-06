const express = require("express");
const multer = require("multer");
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let ogName = path.parse(file.originalname)
    cb(null, ogName.name + "-" + uniqueSuffix + `.${file.fieldname}`);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

//example for how to export out functions for later
// const controller = require("../controllers/file.controller");

let routes = (app) => {
  router.get("/", function (req, res) {
    res.render("pages/index");
  });
  router.get("/upload", function (req, res) {
    res.render("pages/upload");
  });
  router.get("/about", function (req, res) {
    res.render("pages/about");
  });
  router.get("/varExample", function (req, res) {
    var people = [
      { firstName: "Larry", lastName: "Cats", age: 4 },
      { firstName: "Meownis", lastName: "Purrington", age: 10 },
      { firstName: "Fluf", lastName: "McFluffins", age: 7 },
      { firstName: "Sniffels", lastName: "Pawson", age: 1 },
      { firstName: "Patches", lastName: "Johnson", age: 22 },
    ];
    var pageMeaning =
      "This page shows how variables can be sent to ejs pages in the express get call.";

    res.render("pages/varExample", { People: people, Bio: pageMeaning });
  });
  router.post("/upload", upload.single("pdf"), function (req, res) {
    console.log(req.file);
    res.redirect("/upload");
  });

  app.use(router);
};

module.exports = routes;
