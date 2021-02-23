const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const db = require("../db/index");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let ogName = path.parse(file.originalname);
    cb(null, ogName.name + "-" + uniqueSuffix + `.${file.fieldname}`);
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
    function savePathToDB(fileObj) {
      const fileName = fileObj.filename;
      const regex = /([0-9]{9}[.])/;
      const fileId = fileName.match(regex);
      console.log(fileName);
      //parses into object with id being name:
      let result = path.parse(fileId[0]);

      db.knex("file_paths")
        .insert({
          file_id: result.name,
          file_path: process.env.DB_STORAGE_PATH + "/" + fileName,
          book_name: fileName,
        })
        .catch(function (error) {
          console.log(`
        Error Caught in routes function savePath
        ${error}
        `);
        });
      //this info to make other function in /allBooks
    }

    savePathToDB(req.file);
    //savePathToDB()
    res.redirect("/upload");
  });
  router.get("/allBooks", function (req, res) {
    //wrtie function to get all books
    //use file path
    db.knex
      .select()
      .table("file_paths")
      .then(function (rows) {
        const books = rows;
        res.render("pages/allBooks", { Books: books });
      });
    //return all books
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
