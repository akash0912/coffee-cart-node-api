const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const Order = require('./order')
const userSchema = mongoose.Schema({
  email: {
    type: String,
    reqiured: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },

  password: {
    type: String,
    required: true,
    trim: true,
    minLength: [6, "Password length should be atleast 6"],
    validate(value) {
      if (value.length < 6) {
        throw new Error("Password length should be atleast 6.");
      }
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password must not include 'Password' string");
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.virtual("orders",{
  ref:"Order",
  localField:'_id',
  foreignField:"userId"
})

// userSchema.virtual('tasks',{
//     ref:"Task",
//     localField:'_id',
//     foreignField: 'owner'
// })
userSchema.methods.toJSON = function(){
  const user = this;
   
   const userData = user.toObject()
   delete userData.password 
   delete userData.tokens 
   return userData
}

userSchema.methods.generateToken= async function(){
  const user = this;
  // console.log(user)
  const token = jwt.sign({_id: user._id.toString()},process.env.JWT_SECRET);
  user.tokens = user.tokens.concat({token: token});
  await user.save();
  return token;
}

userSchema.statics.findUserByCredentials = async (email, password)=>{
  const user = await User.findOne({email: email})

  if(!user){
    throw new Error("Unable to Login")
  }

  const isMatch = await bcrypt.compare(password, user.password)
  
  if(!isMatch){
    throw new Error("Unable to login")
  }
  return user
}

//Hasing the password 
userSchema.pre('save',async function (next){
  const user = this;
  if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

const User = mongoose.model('User',userSchema)
module.exports = User
