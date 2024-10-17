import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
name:{
    type:String,
    
},
email:{
    type:String,
    unique:true,
    },
password:{
    type:String,
    
},
cartData: {
    type:Object
  },
date:{
        type:Date,
        default:Date.now,
    },

   
})

 export const Users=mongoose.model("Users",userSchema);