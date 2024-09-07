const { bgRed } = require("../utils/consoleMessages");

const errorHandler = (err, req, res, next) => {
    console.log(bgRed("Error occurred: " + err));
    res.send(err.message);
};

module.exports = errorHandler;
