const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");
const hostname = "127.0.0.1";
const port = 9001;

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, "http://www.zaking.com");

  if (parsedUrl.pathname == "/301") {
    let sourceCode = fs.readFileSync(
      path.resolve(__dirname, "./index.html"),
      "utf8"
    );
    res.writeHead(301, {
      Location: "http://www.zaking.com:9001/redirect",
    });
    res.end(sourceCode);
  }
  if (parsedUrl.pathname == "/302") {
    let sourceCode = fs.readFileSync(
      path.resolve(__dirname, "./index.html"),
      "utf8"
    );
    res.writeHead(302, {
      Location: "http://www.zaking.com:9001/redirect",
    });
    res.end(sourceCode);
  }
  if (parsedUrl.pathname == "/redirect") {
    let sourceCode = fs.readFileSync(
      path.resolve(__dirname, "./redirect.html"),
      "utf8"
    );
    res.end(sourceCode);
  }
  // 死循环了
  if (parsedUrl.pathname == "/cycle") {
    let sourceCode = fs.readFileSync(
      path.resolve(__dirname, "./cycle.html"),
      "utf8"
    );
    res.writeHead(302, {
      Location: "http://www.zaking.com:9001/back",
    });
    res.end(sourceCode);
  }
  if (parsedUrl.pathname == "/back") {
    let sourceCode = fs.readFileSync(
      path.resolve(__dirname, "./back.html"),
      "utf8"
    );
    res.writeHead(302, {
      Location: "http://www.zaking.com:9001/cycle",
    });
    res.end(sourceCode);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
