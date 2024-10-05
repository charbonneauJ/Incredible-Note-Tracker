const notes = require("express").Router();

app.get("/", (req, res) => {
  res.send("GET request to the homepage");
});

app.post("/", function (req, res) {
  res.send("POST request to the homepage");
});

var bodyParser = require("body-parser");
app.use(bodyParser.json());

app.delete("/products/:id", function (req, res) {
  const { id } = req.params;
  res.send(`Delete record with id ${id}`);
});

module.export = notes;
