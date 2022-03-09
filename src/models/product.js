const mongoose = require('mongoose');
const Product = mongoose.model("Product",{
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true,

    },
    ingredients:{
        type:Array,
        required: true
    },
    image:{
        type: String
    }
});


module.exports = Product;