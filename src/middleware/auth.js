const jwt = require('jsonwebtoken');
const User = require('../models/user')

const auth=async(req, res, next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ','');
        const verified = jwt.verify(token, process.env.JWT_SECRET); //This will return userId that will match the token
        const user = await User.findOne({_id: verified._id, 'tokens.token': token})
        // console.log(user)
        if(!user){
            throw new Error("No user Found")
        }
        req.user = user;
        req.token = token;
        next();
    }catch(e){
        res.status(401).send({error:"Please Authenticate"})
    }
}

module.exports = auth