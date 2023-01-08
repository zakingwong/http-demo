const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");
const hostname = "127.0.0.1";
const port = 9000;

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, "http://www.zaking.com");

  if (parsedUrl.pathname == "/") {
    let sourceCode = fs.readFileSync(
      path.resolve(__dirname, "./index.html"),
      "utf8"
    );
    res.end(sourceCode);
  }
  if (parsedUrl.pathname == "/connection") {
    res.end("connection");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
