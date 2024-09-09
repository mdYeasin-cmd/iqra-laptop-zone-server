const User = require("../models/users.model");

const registerAUserIntoDB = async (data) => {
    const result = await User.create(data);
    return result;
};

module.exports = {
    registerAUserIntoDB,
};
