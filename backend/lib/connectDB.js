const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("✅ Successfully connected to database");
    } catch (err) {
        console.log("❌ Connection failed to database", err);
        throw err
    }
}

module.exports = connectDB;