const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

const db = require("./config/db");

// Connect database
try {
  db.authenticate();
} catch (err) {
  console.error("Unable to connect to the database:", err);
}

// Middleware json
app.use(express.json({ extended: false }));


app.use("/api/users", require("./routes/api/users"));

app.get("/", (req, res) => res.send("Working..."));

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));