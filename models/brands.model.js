const mongoose = require("mongoose");

const brandSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            min: [3, "Name must be have at least 3 characters"],
            min: [31, "Name must can have maximum 31 characters"],
        },
        establishedYear: {
            type: Number,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
