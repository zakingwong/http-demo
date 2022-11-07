const express = require("express");
const app = express();
const port = 3000;
app.use(function (req, res, next) {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "X-NAME,Content-Type",
  });
  if (req.method === "OPTIONS") {
    res.end(); // OPTIONS请求不做任何处理
  }
  next();
});
app.get("/api", function (req, res) {
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
