const express = require("express");
const app = express();
const userRoutes = require("./controllers/userController");

app.use(express.json());

app.use("/", userRoutes);

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// MJ3kuo8GESGTUlJT
// uses jsonwebtoken and express and uses root directory to make the clone cleaner