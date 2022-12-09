const http = require("http");
const fs = require("fs");
const path = require("path");
const hostname = "127.0.0.1";
const port = 9000;

const server = http.createServer((req, res) => {
  let sourceCode = fs.readFileSync(
    path.resolve(__dirname, "../media/puppy.jpeg"),
    "utf8"
  );
  res.end(sourceCode);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
