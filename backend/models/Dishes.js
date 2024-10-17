import mongoose from "mongoose";
const DishSchema=new mongoose.Schema({
    id:{
        type:Number,
        required:true,
    },
name:{
    type:String,
    required:true,
},
image:{
    type:String,
    required:true,
    },
category:{
    type:String,
    required:true,
},
price:{
    type:Number,
    required:true,
},
kind:{
type:String,
required:true,
},
date:{
        type:Date,
        default:Date.now,
    },
 available:{
        type:Boolean,
        default:true,
    },
   
})

 export const Dishes=mongoose.model("Dishes",DishSchema);