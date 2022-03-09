const mongoose = require('mongoose');
const express = require('express')
const router = express.Router();
const Product = require('../models/product.js')
const {auth, authRole} = require('../middleware/auth.js')
router.post('/product/create', auth, authRole('admin'),async (req, res)=>{
    try{
       const product = new Product(req.body);
        await product.save();
        res.status(201).send(product)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get("/products", auth, async (req, res) => {
  try {
    const products = await Product.find({});
    // await product.save();
    res.status(201).send(products);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch('/products/:id',auth, authRole('admin') ,async (req, res)=>{
    try{
        const _id = req.params.id;
        console.log(req.body)
        const updates = Object.keys(req.body)
        const product = await Product.findOne({_id: _id});
        // console.log(product)
        if(!product){
            throw new Error("Product not found!")
        }
        updates.forEach(update=> product[update] = req.body[update])
        await product.save();

        res.send(product)
    }catch(e){
        res.status(400).send(e)
    }
})
router.delete('/product/:id',auth, authRole('admin'), async (req,res)=>{
    try{
        const _id = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete({_id})
        res.send(deletedProduct)
    }catch(e){
        res.status(400).send({})
    }
})
module.exports = router