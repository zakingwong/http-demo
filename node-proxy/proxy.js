const http = require("http");
const server = http.createServer((request, response) => {
  response.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  http
    .request(
      {
        host: "127.0.0.1",
        port: 6000,
        url: "/api",
        method: request.method,
        headers: request.headers,
      },
      (serverResponse) => {
        var body = "";
        serverResponse.on("data", (chunk) => {
          body += chunk;
        });
        serverResponse.on("end", () => {
          console.log(body);
          response.end(body);
        });
      }
    )
    .end();
});
server.listen(3000);
