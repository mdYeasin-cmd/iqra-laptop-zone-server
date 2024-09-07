// const { ordersCollection } = require("../utils/dbCollection");
const { ObjectId } = require("mongodb");

exports.placeAOrder = async (req, res) => {
    const order = req.body;
    const result = await ordersCollection.insertOne(order);
    res.send(result);
};

exports.getOrderByEmail = async (req, res) => {
    console.log("Order by email");
    try {
        const email = req.query.email;
        const query = { email: email };
        const result = await ordersCollection.find(query).toArray();
        res.send(result);
    } catch (error) {
        console.log(
            error,
            "Error occur when user try to find order using email"
        );
    }
};

exports.getOrderByOrderId = async (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await ordersCollection.findOne(query);
    res.send(result);
};
