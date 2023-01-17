const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");
const hostname = "127.0.0.1";
const port = 9001;

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, "http://www.zaking.com");

  if (parsedUrl.pathname == "/set-cookie") {
    let sourceCode = fs.readFileSync(
      path.resolve(__dirname, "./index.html"),
      "utf8"
    );
    res.setHeader("Set-Cookie", [
      "age=13; path=/; max-age=5",
      "name=zaking; path=/set-cookie; max-age=10;HttpOnly",
      "hide=true; path=/else; max-age=1000",
    ]);
    res.end(sourceCode);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
