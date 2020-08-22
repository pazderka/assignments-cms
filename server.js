const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

const connectDb = require("./config/db");

// Connect database
connectDb();

app.get("/", (req, res) => res.send("Working..."));

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));