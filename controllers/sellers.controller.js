// const { usersCollection } = require("../utils/dbCollection");
const { ObjectId } = require("mongodb");

exports.getAllSellers = async (req, res) => {
    const email = req.query.email;

    if (email) {
        const email = req.query.email;
        console.log(email);
        const query = { email: email };
        const result = await usersCollection.findOne(query);
        if (result) {
            res.send(result);
        } else {
            res.send({
                message: "Not found any seller by this email",
            });
        }
    } else {
        const query = { userRole: "seller" };
        const result = await usersCollection.find(query).toArray();
        res.send(result);
    }
};

exports.deleteASeller = async (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await usersCollection.deleteOne(query);
    res.send(result);
};

exports.verifyASeller = async (req, res) => {
    const id = req.params.id;
    const body = req.body.isVerified;
    const filter = { _id: ObjectId(id) };
    const options = { upsert: true };
    const updateDoc = {
        $set: {
            isVerified: body,
        },
    };
    const result = await usersCollection.updateOne(filter, updateDoc, options);
    res.send(result);
};
