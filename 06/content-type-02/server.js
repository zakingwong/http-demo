const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");
const hostname = "127.0.0.1";
const port = 9000;

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, "http://www.zaking.com");
  // 浏览器icon，浏览器会默认请求，如果是这个的话，直接返回个200好了。
  // 或者你可以自己尝试返回一个icon，啊哈哈
  if (parsedUrl.pathname == "/favicon.ico") {
    res.writeHead(200);
    res.end();
    return;
  }
  // 返回静态html文件
  if (parsedUrl.pathname == "/home") {
    let sourceCode = fs.readFileSync(
      path.resolve(__dirname, "./index.html"),
      "utf8"
    );
    res.end(sourceCode);
  }
  // 返回静态资源即将请求的内容
  if (parsedUrl.pathname == "/api") {
    let sourceCode = fs.readFileSync(
      path.resolve(__dirname, "../media/web.json"),
      "utf8"
    );
    res.end(sourceCode);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
