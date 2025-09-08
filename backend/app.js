require("dotenv").config();
const express = require("express");
const connectDB = require("./lib/connectDB");

const app = express();

app.use(express.json());

const PORT = process.env.PORT;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});