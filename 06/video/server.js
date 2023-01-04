const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");
const { Buffer } = require("node:buffer");

const hostname = "www.zaking.com";
const port = 9000;

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, "http://www.zaking.com");
  if (parsedUrl.pathname == "/favicon.ico") {
    res.writeHead(200);
    res.end();
    return;
  }
  if (parsedUrl.pathname == "/") {
    res.writeHead(200, { "Content-Type": "text/html" });

    res.end("Please Try /home");
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

    const chunkSize = 1024 * 1024;
    const chunks = [];
    for (let i = 0; i < bufSource.length; i += chunkSize) {
      chunks.push(Uint8Array.prototype.slice.call(bufSource, i, i + chunkSize));
    }
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
  if (parsedUrl.pathname == "/simple-range") {
    let videoSource = fs.readFileSync(
      path.resolve(__dirname, "../media/maomao.mp4")
    );
    // 转换
    const bufSource = Buffer.from(videoSource);
    // 获取长度
    const bufSourceLen = bufSource.length;
    // 获取请求的Range头的长度范围
    const range = req.headers["range"];
    const rangeVal = range.split("=")[1].split("-");
    // 获取开始和结束的长度
    const start = parseInt(rangeVal[0], 10);
    const end = rangeVal[1] ? parseInt(rangeVal[1], 10) : start + bufSourceLen;
    console.log(start, end, bufSourceLen);
    // 判断是否超出请求资源的最大长度,就返回416
    if (start > bufSourceLen || end > bufSourceLen + 1) {
      res.writeHead(416, { "Content-Range": `bytes */${bufSourceLen}` });
      res.end();
    } else {
      // 否则返回206即可
      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${bufSourceLen}`,
        "Accept-Ranges": "bytes",
        "Content-type": "video/mp4",
      });
      res.write(Uint8Array.prototype.slice.call(bufSource, start, end));
      res.end();
    }
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
