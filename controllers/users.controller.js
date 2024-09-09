const { registerAUserIntoDB } = require("../services/users.service");

// register a user
const registerUser = async (req, res, next) => {
    try {
        const data = req.body;

        const result = await registerAUserIntoDB(data);

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

// get all user or query user using email
const getAllUsers = async (req, res) => {
    const email = req.query.email;
    if (email) {
        const query = { email: email };
        const result = await usersCollection.findOne(query);
        res.send(result);
    } else {
        const query = {};
        const result = await usersCollection.find(query).toArray();
        res.send(result);
    }
};

module.exports = {
    registerUser,
    getAllUsers,
};
