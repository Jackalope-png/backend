const express = require('express');
const app = express();
const fs = require('fs');
let data = [];

fs.readFile('userdata.json', 'utf8', (err, jsonData) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  try {
    data = JSON.parse(jsonData);
  } catch (jsonErr) {
    console.error("Error parsing JSON:", jsonErr);
  }
});

app.use(express.json());

app.post("/login", (req, res) => {
  const body = req.body;
  const id = body.id;
  const currentUser = data.find((user) => user.id === Number(id));

  console.log(currentUser);
  if (currentUser) {
    res.send(currentUser);
  } else {
    return res.send({ message: "User not found" });
  }
});


app.listen(3000, () => {
  console.log('all good buddy');
});