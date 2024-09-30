const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("content", "text/plain");
    res.end("Hello User");
  } else if (req.url === "/profile") {
    res.statusCode = 200;
    res.setHeader("content", "text/plain");
    res.end("Hello Aman!");
  } else {
    res.statusCode = 404;
    res.setHeader("content", "text/plain");
    res.end("Not Found");
  }
});

server.listen(port, hostname, () => {
  console.log(`server is listening on the port http://${hostname}:${port}`);
});
