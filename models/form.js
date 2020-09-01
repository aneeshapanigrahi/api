const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    item: {//Men,Women
        type: String,
        required: true
    },
    images: [{
        type: String,
        required: true
    }],
    scale: {
        type: String,
        required: true
    },
    getDesignerHome: {
        type: Boolean,
        default: false
    },
    haveMaterial: {
        type: Boolean,
        default: false
    },
    contact: {
        type: Number
    },
    emailId: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    },
    pincode: {
        type: Number
    },
    quantity: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Form", formSchema);

