require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const connectDB = require("./lib/connectDB");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan('dev'));

app.use("/api/auth/", require("./routes/auth_route"));

app.use("/api/users/", require("./routes/user_route"));

app.use("/api/requests/", require("./routes/supportRequest_route"));

app.use("/api/offers/", require("./routes/supportOffer_route"));

app.use("/api/favorites/", require("./routes/favorites_route"));

app.use("/api/messages/", require("./routes/messageThreads_route"));

const PORT = process.env.PORT;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});