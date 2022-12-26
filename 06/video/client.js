const http = require("http");

const options = {
  hostname: "www.zaking.com",
  port: 9000,
  path: "/video-chunked",
  method: "GET",
};

const req = http.request(options, (res) => {
  // console.log(res, "res");
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.on("data", (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on("end", () => {
    console.log("No more data in response.");
  });
});

req.on("error", (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.end();
