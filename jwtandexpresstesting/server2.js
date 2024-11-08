const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

const users = [
  { name: "john", id: 1 },
  { name: "doe", id: 2 },
  { name: "poser", id: 3 },
];

app.get("/users", (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.status(403).send("No access");
  }

  jwt.verify(token, "poser", (err) => {
    if (err) {
      return res.status(401).send("Invalid token");
    }
    res.send(users);
  });
});

app.post("/login", (req, res) => {
  const body = req.body;
  const token = jwt.sign(body, "poser");
  res.send({ token });
  console.log(token);
});

app.listen(3001, () => console.log("all good buddy"));
