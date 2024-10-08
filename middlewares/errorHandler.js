const { bgRed } = require("../utils/consoleMessages");

const errorHandler = (err, _req, res, _next) => {
    console.log(bgRed("Error occurred: " + err));
    res.send(err.message);
};

module.exports = errorHandler;
