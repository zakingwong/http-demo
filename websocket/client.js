let fs = require("fs");
let path = require("path");
const express = require("express");
const app = express();
const port = 4000;
app.get("/", (req, res) => {
  let sourceCode = fs.readFileSync(
    path.resolve(__dirname, "static/index.html"),
    "utf8"
  );

  res.send(sourceCode);
});

app.listen(port);
