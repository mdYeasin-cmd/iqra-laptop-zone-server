const { usersCollection } = require("../utils/dbCollection");

// get all user or query user using email
exports.getAllUsers = async (req, res) => {
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
}

// create a user
exports.createAUser = async (req, res) => {
    const user = req.body;
    const result = await usersCollection.insertOne(user);
    res.send(result);
}