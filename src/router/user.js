const express = require("express");
const router = express.Router();
const User = require('../models/user.js')
const auth = require('../middleware/auth.js')
router.post("/signup", async (req, res) => {
  try{
    const user = new User(req.body)
  await user.save();
  const token = await user.generateToken();
  res.status(201).send({user, token})
  }catch(e){
    if(JSON.stringify(e).includes('email')){
    res.status(400).send({
        error: "EMAIL_ALREADY_IN_USE"
      })
  }
    if(JSON.stringify(e).includes('password')){
    res.status(400).send({
        error: "PASSWORD_IS_INVALID"
      })
    }
    res.status(400).send(e)
  }
});

router.post('/login',async(req, res)=>{
  try{const user = await User.findUserByCredentials(req.body.email, req.body.password)
  const token = await user.generateToken();
    res.send({user, token})
    }catch(e){
      res.status(400).send({})
    }
});

router.post('/users/logout',auth, async(req, res)=>{
    try{
      req.user.tokens = req.user.tokens.filter(token=> token.token !== req.token)
      await req.user.save();
      res.send("logged out successfuly");
    }catch(e){
      res.status(400).send(e)
    }
})  
module.exports = router;