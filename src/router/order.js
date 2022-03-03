const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const Order = require("../models/order.js");
const auth = require("../middleware/auth.js");

router.post('/users/orders',auth,async(req, res)=>{
    try{
        const order = new Order({
        ...req.body,
        userId:req.user._id
        });
    await order.save();
    res.status(201).send(order)
    }catch(e){
        res.status(400).send(e)
    }

})
router.get('/users/orders',auth, async(req, res)=>{
    try {
        await req.user.populate('orders')
        if(!req.user.orders){
            throw new Error("No Orders found")
        }
        res.send(req.user.orders)
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router