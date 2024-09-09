const {
    getProductsByEmailService,
    createAProductService,
    updateAProductService,
} = require("../services/products.service");
// const { productsCollection } = require("../utils/dbCollection");
const { ObjectId } = require("mongodb");

exports.getProductsByEmail = async (req, res) => {
    try {
        const email = req.query.email;
        const result = await getProductsByEmailService(email);

        res.status(200).json({
            status: "true",
            message: "Successfully get data using your given email",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            status: "false",
            message: "Couldn't get any product using this email",
            error: error.message,
        });
    }
};

exports.createAProduct = async (req, res) => {
    try {
        const product = req.body;
        const result = await createAProductService(product);

        res.status(201).json({
            status: "true",
            message: "Successfully create a new product.",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            status: "false",
            message: "Can't create product here!",
            error: error.message,
        });
    }
};

exports.updateAProduct = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(req.body);
        const body = req.body;
        console.log(body);
        const result = await updateAProductService(id, body);

        res.status(201).json({
            status: "true",
            message: "Successfully updated the product.",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            status: "false",
            message: "Can't updated the product.",
            error: error.message,
        });
    }
};

exports.deleteAProduct = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const query = { _id: ObjectId(id) };
    const result = await productsCollection.deleteOne(query);
    res.send(result);
};

exports.reportAProduct = async (req, res) => {
    const id = req.params.id;
    const body = req.body.isReported;
    const filter = { _id: ObjectId(id) };
    const options = { upsert: true };
    const updateDoc = {
        $set: {
            isReported: body,
        },
    };
    const result = await productsCollection.updateOne(
        filter,
        updateDoc,
        options
    );
    res.send(result);
};

exports.getAllReportedProducts = async (req, res) => {
    const query = { isReported: true };
    const result = await productsCollection.find(query).toArray();
    res.send(result);
};

const fileUpload = async (req, res) => {
    try {
        res.status(201).json({
            data: req.files,
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    fileUpload,
};
