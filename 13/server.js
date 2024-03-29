const http2 = require("node:http2");
const fs = require("node:fs");

const server = http2.createServer();
server.on("error", (err) => console.error(err));

server.on("stream", (stream, headers) => {
  if (headers["path"] === "/") {
    stream.respond({
      "content-type": "text/html; charset=utf-8",
      ":status": 200,
    });
    stream.end("<h1>Hello World</h1>");
  }
});

server.listen(8443);
