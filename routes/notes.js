const notes = require("express").Router();
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

var bodyParser = require("body-parser");
notes.use(bodyParser.json());

notes.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

notes.get("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "../db/db.json"), "UTF8", (err, data) => {
    if (err) {
      res.send(err);
    }
    res.json(JSON.parse(data));
  });
});

notes.post("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "db.json"), "UTF8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading notes");
    }
    const notes = JSON.parse(data);

    const newNote = {
      id: uuidv4(),
      title: req.body.title,
      text: req.body.text,
    };

    notes.push(newNote);

    fs.writeFile(
      path.join(__dirname, "db.json"),
      JSON.stringify(notes, null, 2),
      (err) => {
        if (err) {
          return res.status(500).send("Error saving note");
        }
        res.json(newNote);
      }
    );
  });
});

module.exports = notes;
