const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const users = [
  { name: "john", id: 1 },
  { name: "doe", id: 2 },
  { name: "poser", id: 3 },
];

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  
  if (!token) {
    return res.status(403).send("No access");
  }

  jwt.verify(token, "poser", (err) => {
    if (err) {
      return res.status(401).send("Invalid token");
    }
    next();
  });
};

router.get("/users", authMiddleware, (req, res) => {
  res.send(users);
});

router.post("/login", (req, res) => {
  const body = req.body;
  const token = jwt.sign(body, "poser");
  res.send({ token });
  console.log(token);
});

module.exports = router;