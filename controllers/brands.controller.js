const { addABrandInotDB, getAllBrandsFromDB } = require("../services/brands.service");

const addABrand = async (req, res, next) => {
    try {
        const data = req.body;

        const result = await addABrandInotDB(data);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const getAllBrands = async (req, res, next) => {
    try {
        const result = await getAllBrandsFromDB();

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addABrand,
    getAllBrands
};