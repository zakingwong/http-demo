const express = require("express");
const app = express();
const port = 3000;
app.get("/", function (req, res) {
  res.end(
    JSON.stringify({
      type: "cors",
      message: "ok",
      code: 1,
      body: { content: [{ a: 1, b: 2 }], page: 1, total: 10 },
    })
  );
});

app.listen(port);
