const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");

const db = require("./config/db");

// Connect database
try {
  db.authenticate();
} catch (err) {
  console.error("Unable to connect to the database:", err);
}

// Middleware json
app.use(express.json({ extended: false }));
app.use(cors("*"));


app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/project", require("./routes/api/project"));
app.use("/api/statistic", require("./routes/api/statistic"));

app.get("/", (req, res) => res.send("Working..."));

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
