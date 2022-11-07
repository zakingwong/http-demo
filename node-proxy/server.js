const http = require("http");
const server = http.createServer((request, response) => {
  response.end(
    JSON.stringify({
      type: "cors",
      message: "ok",
      code: 1,
      body: { content: [{ a: 1, b: 2 }], page: 1, total: 10 },
    })
  );
});
server.listen(6000);
