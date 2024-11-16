const http = require("http");
const fs = require("fs");
const { stringify } = require("querystring");
let data = [];
const JSON_DATA = fs.readFileSync("./data.json", "utf8");
data = JSON.parse(JSON_DATA);
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  res.setHeader("Content-Type", "application/json");
  // html link with node

  // if (url === "/users") {
  //   console.log("working");
  //   fs.readFile("index.html", "utf8", (err, data) => {
  //     res.statusCode = 200;
  //     res.setHeader("Content-Type", "text/html");
  //     res.write(data);
  //     res.end();
  //   } else {
  //     res.statusCode = 404;
  //     res.setHeader("Content-type", "text/plain");
  //     res.write("not found");
  //     res.end();
  //   });

  // json data node(looks like an api)

  // if (url.startsWith("/users/id=")) {
  //       console.log("working");
  //       const id = parseInt(url.split("=")[1], 10);
  //       const user = data2.find((user) => user.id === id);
  //       if (user) {
  //       res.statusCode = 200;
  //       res.setHeader("Content-Type", "application/json");
  //       res.write(JSON.stringify(user));
  //       } else {
  //     res.statusCode = 404;
  //     res.setHeader("Content-Type", "text/plain");
  //     res.write("nothing was found");
  //   }
  //   res.end();
  // } else {
  //   res.statusCode = 404;
  //   res.setHeader("Content-type", "text/plain");
  //   res.write("not found");
  //   res.end();
  // }
  if (method === "POST" && url === "/api/data") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        const jsonData = JSON.parse(body);
        console.log(jsonData);

        const newUser = {
          id: data.length + 1,
          ...jsonData,
        };

        data.push(newUser);
        console.log(data);

        fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
          if (err) {
            console.error(err);
            res.writeHead(500, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ message: "Failed to save data" }));
          }
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Data received", data: newUser }));
        });
      } catch (error) {
        console.error(error);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Invalid JSON" }));
      }
    });

    return;
  }

  res.writeHead(405, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Method not allowed" }));
});

server.listen(3000, () => console.log("Server running on port 3000"));
