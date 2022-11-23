const http = require("http");

const hostname = "127.0.0.1";
const port = 8090;

const server = http.createServer((req, res) => {
  console.log("received");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.statusCode = 599;
  res.statusMessage = "Zaking Not Know";
  res.end("Hello Zaking World!This is Node");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
