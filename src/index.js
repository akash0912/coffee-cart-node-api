const express = require('express');
const app = express();
require('./db/mongoose.js')
const userRouter = require('./router/user.js')
const orderRouter = require('./router/order.js')
const productRouter = require('./router/product.js')
const port = process.env.PORT || 3000
app.use(express.json())
app.use(userRouter)
app.use(orderRouter)
app.use(productRouter)

app.listen(port,()=>{
    console.log("Server has started on port: "+port)
})

