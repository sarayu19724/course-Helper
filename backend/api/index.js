const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config({ path: path.join(__dirname, '../../.env') }); // ← fixed path

const authRoutes = require('./routes/authroutes');
const coursesRoutes = require("./routes/courseroute");

app.use(cors({
  origin: 'https://course-helper-d94u.vercel.app/',
  credentials: true
}));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000; // ← fixed env var name

app.use("/courses", coursesRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => res.send("Backend is running!"));

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});

module.exports = app;
