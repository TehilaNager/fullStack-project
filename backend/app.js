require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const connectDB = require("./lib/connectDB");

const app = express();

app.use(express.json());

app.use(morgan('dev'));

app.use("/api/auth/", require("./routes/auth_route"));

const PORT = process.env.PORT;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});