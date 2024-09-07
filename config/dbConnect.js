const mongoose = require('mongoose');
const { bgRed, bgGreen } = require("../utils/consoleMessages");
const config = require('.');

const dbConnect = async () => {
    try {
        await mongoose.connect(config.databaseUrl);
        console.log(bgGreen("MongoDB database is connected successfully!"));
    } catch (error) {
        console.log(bgRed("Error occurred while connecting to MongoDB database", error));
    }
}

module.exports = dbConnect;