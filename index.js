const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users");
const taskRoutes = require("./routes/tasks");

const app = express();

app.use(bodyParser.json());

// Routes
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
