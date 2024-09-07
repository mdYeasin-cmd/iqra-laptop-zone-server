// const { usersCollection } = require("../utils/dbCollection");
const { ObjectId } = require("mongodb");

exports.getAllBuyers = async (req, res) => {
    const query = { userRole: "buyer" };
    const result = await usersCollection.find(query).toArray();
    res.send(result);
};

exports.deleteABuyer = async (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await usersCollection.deleteOne(query);
    res.send(result);
};
