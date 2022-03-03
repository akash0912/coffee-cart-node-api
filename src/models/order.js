const mongoose = require('mongoose')

const Order = mongoose.model('Order',{
    userId:{
        type: String,
        required: true,
        trim: true,
    },
    cartItems:{
        type: Array,
        required: true
    },
    totalAmount:{
        type: Number,
        required: true
    },
    date:{
        type:String,
        required: true
    }
})

module.exports = Order;