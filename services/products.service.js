// const Product = require("../models/Product");

const createAProductService = async (data) => {

    // if (data.id == 10) {
    //     console.log("Test");
    // }

    const result = await Product.create(data);
    return result;
};

// exports.getProductsByEmailService = async (email) => {
//     const result = await Product.find({ sellerEmail: email });
//     return result;
// };

// exports.updateAProductService = async (id, data) => {
//     const updatedProduct = await Product.updateOne(
//         { _id: id },
//         { $set: data },
//         { runValidators: true }
//     );
//     return updatedProduct;
// };

module.exports = {
    createAProductService
}
