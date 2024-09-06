const mongoose = require("mongoose");
const { consoleMessageColor } = require("./consoleMessages");
require("dotenv").config();

async function dbConnect() {
    return mongoose
        .connect(process.env.DB_LOCAL)
        .then(() => {
            console.log(consoleMessageColor(`Database is connected here!`));
        })
        .catch((error) => {
            console.log(
                consoleMessageColor("Error occur when try to connect with db"),
                error.message
            );
        });
}

module.exports = dbConnect;
