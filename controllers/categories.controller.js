const {
    categoriesCollection,
    productsCollection,
} = require("../utils/dbCollection");

// show all categories only
exports.getAllCategories = async (req, res) => {
    const query = {};
    const result = await categoriesCollection.find(query).toArray();
    res.send(result);
};

// show products according to category
exports.getACategory = async (req, res) => {
    const id = req.params.id;
    const query = { category_id: id };
    const result = await productsCollection.find(query).toArray();
    res.send(result);
};
