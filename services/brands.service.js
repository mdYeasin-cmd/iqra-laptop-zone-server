const Brand = require("../models/brands.model");

const addABrandInotDB = async (data) => {
    const result = await Brand.create(data);
    return result;
}

const getAllBrandsFromDB = async () => {
    const result = await Brand.find();
    return result;
};

const getABrandFromDB = async () => { };

module.exports = {
    addABrandInotDB,
    getAllBrandsFromDB,
    getABrandFromDB
};