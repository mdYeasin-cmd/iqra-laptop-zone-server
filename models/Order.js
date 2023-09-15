const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    customerName: {
        type: String,
        required: [true, "Please provide your valid name"],
        trim: true,
        minLength: [3, "Customer name must be at least 3 characters"],
        maxLength: [100, "Customer name can't be more than 100 characters"]
    },
    customerEmail: {
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
    productName: {
        type: String,
        required: [true, "Please provide a product name"],
        trim: true,
        unique: [true, "Product name must be unique"],
        minLength: [3, "Product name must be at least 3 characters"],
        maxLength: [100, "Product name can't be more than 100 characters"]
    },
    productPrice: {
        type: Number,
        required: true,
        min: [0, "Product price can't be negative"]
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
    meetingLocation: {
        type: String,
        required: [true, "You must be provide meeting location"],
        trim: true,
    },
    productImage: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
                return urlPattern.test(value);
            },
            message: (props) => `${props.value} is not a valid URL!`
        }
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;