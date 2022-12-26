const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");
const { Buffer } = require("node:buffer");

const hostname = "127.0.0.1";
const port = 9000;

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, "http://www.zaking.com");
  if (parsedUrl.pathname == "/favicon.ico") {
    res.writeHead(200);
    res.end();
    return;
  }
  if (parsedUrl.pathname == "/home") {
    let sourceCode = fs.readFileSync(
      path.resolve(__dirname, "./index.html"),
      "utf8"
    );
    res.end(sourceCode);
  }

  if (parsedUrl.pathname == "/video") {
    let sourceCode = fs.readFileSync(
      path.resolve(__dirname, "../media/maomao.mp4")
    );
    res.setHeader("Content-Type", "video/mp4");
    res.end(sourceCode);
  }
  if (parsedUrl.pathname == "/video-chunked") {
    let sourceCode = fs.readFileSync(
      path.resolve(__dirname, "../media/maomao.mp4")
    );
    const bufSource = Buffer.from(sourceCode);
    res.setHeader("Content-Type", "video/mp4");
    res.setHeader("Transfer-Encoding", "chunked");

    const chunkSize = 1024;
    const chunks = [];
    for (let i = 0; i < bufSource.length; i += chunkSize) {
      chunks.push(Uint8Array.prototype.slice.call(bufSource, i, i + chunkSize));
    }
    console.log(chunks, "chunks");
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      res.write(chunk);
    }
    res.end();
  }
  if (parsedUrl.pathname == "/str-chunked") {
    res.writeHead(200, { "Transfer-Encoding": "chunked" });
    res.write("Hello");
    setTimeout(() => {
      res.write(" World");
      res.end();
    }, 1000);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
