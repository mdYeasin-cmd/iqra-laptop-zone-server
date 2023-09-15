const { productsCollection } = require("../utils/dbCollection");
const { ObjectId } = require('mongodb');

exports.getProductsByEmail = async (req, res) => {
    const email = req.query.email;
    const query = { sellerEmail: email };
    const result = await productsCollection.find(query).toArray();
    res.send(result);
}

exports.createAProduct = async (req, res) => {
    const product = req.body;
    const result = await productsCollection.insertOne(product);
    res.send(result);
}

exports.updateAProduct = async (req, res) => {
    const id = req.params.id;
    const body = req.body.isAdvertise;
    const filter = { _id: ObjectId(id) };
    const options = { upsert: true };
    const updateDoc = {
        $set: {
            isAdvertise: body
        }
    };
    const result = await productsCollection.updateOne(filter, updateDoc, options);
    res.send(result);
}

exports.deleteAProduct = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const query = { _id: ObjectId(id) };
    const result = await productsCollection.deleteOne(query);
    res.send(result);
}

exports.reportAProduct = async (req, res) => {
    const id = req.params.id;
    const body = req.body.isReported;
    const filter = { _id: ObjectId(id) };
    const options = { upsert: true };
    const updateDoc = {
        $set: {
            isReported: body
        }
    };
    const result = await productsCollection.updateOne(filter, updateDoc, options);
    res.send(result);
}

exports.getAllReportedProducts = async (req, res) => {
    const query = { isReported: true };
    const result = await productsCollection.find(query).toArray();
    res.send(result);
}