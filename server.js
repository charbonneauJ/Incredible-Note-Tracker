const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const notes = require("./routes/notes");

app.use(express.static("public"));
app.use(notes);

// GET Route for homepage
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
