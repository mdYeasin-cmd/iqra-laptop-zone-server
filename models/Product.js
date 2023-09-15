const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    categoryId: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: [true, "Please provide a product name"],
        trim: true,
        unique: [true, "Product name must be unique"],
        minLength: [3, "Product name must be at least 3 characters"],
        maxLength: [100, "Product name can't be more than 100 characters"]
    },
    photoUrl: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
                return urlPattern.test(value);
            },
            message: (props) => `${props.value} is not a valid URL!`
        }
    },
    resalePrice: {
        type: Number,
        required: true,
        min: [0, "Resale price can't be negative"]
    },
    orginalPrice: {
        type: Number,
        required: true,
        min: [0, "Orginal price can't be negative"]
    },
    productCondition: {
        type: String,
        required: true,
        enum: {
            values: ["excellent", "good", "fair"],
            message: "{VALUE} can't be a product condition"
        }
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                const phoneRegex = /^\+\d{1,4}\d{8,}$/;
                return phoneRegex.test(value);
            },
            message: (props) => `${props.value} is not a valid phone number`
        }
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    yearOfUse: {
        type: Number,
        required: true,
        min: [0, "Year of use can't be negative"]
    },
    yearOfPurchase: {
        type: Number,
        required: true,
        min: [0, "Year of purchase can't be negative"]
    },
    sellerName: {
        type: String,
        required: true,
        minLength: [3, "Seller name must be at least 3 characters"],
        maxLength: [100, "Seller name can't be more than 100 characters"]
    },
    sellerEmail: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                return emailPattern.test(value);
            },
            message: props => `${props.value} is not a valid email address!`,
        },
    },
    isReported: {
        type: Boolean,
        required: false
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;