const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs-extra");
require("dotenv").config();
const { Storage } = require("@google-cloud/storage");
const utility = require("../utilities");
const db = require("../db/index");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let ogName = path.parse(file.originalname);
    cb(null, ogName.name + `.${file.fieldname}`);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

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
    db.uploadFile(req.file.path, req.file.filename)
      .then(() => {
        utility.deleteFile(`./uploads/${req.file.filename}`);
      })
      .catch((err) => console.log(err));

    res.redirect("/upload");
  });
  router.get("/allBooks", function (req, res) {
    // db.knex
    //   .select()
    //   .table("file_paths")
    //   .then(function (rows) {
    //     const books = rows;
    //     res.render("pages/allBooks", { Books: books });
    //   });
    db.getAllFiles().then((files) => {
        const books = files;
        res.render("pages/allBooks", { Books: books });
      files.forEach((file) => {
        console.log(file.name);
      });
    });
    // res.send("worked");
  });
  router.get("/book/:file_id", function (req, res) {
    const bookId = req.params.file_id;
    const test = { id: bookId };

    res.render("pages/book", { ID: bookId });
  });
  router.post("/book/:file_id", function (req, res) {
    const bookId = req.params.file_id;

    console.log(req.body.download);
    //write function to in act the download
    //get book by id
    db.knex("file_paths")
      .where({ file_id: bookId })
      .select("file_path")
      .then(function (row) {
        const filePath = "." + row[0].file_path;
        res.download(filePath);
      });
  });
  app.use(router);
};

module.exports = routes;
