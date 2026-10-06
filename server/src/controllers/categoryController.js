const Category = require("../models/Category");

const addCategory = async (req,res)=>{

try{

const{

categoryName,
description

}=req.body;

if(categoryName===""){

return res.status(400).json({

success:false,
message:"Category Name is required"

});

}

const existingCategory =
await Category.findOne({

categoryName

});

if(existingCategory){

return res.status(400).json({

success:false,
message:"Category already exists"

});

}

const category =
await Category.create({

categoryName,
description

});

res.status(201).json({

success:true,
message:"Category Added Successfully",
category

});

}

catch(error){

res.status(500).json({

success:false,
message:error.message

});

}

};
const getCategories = async(req,res)=>{

try{

const categories =
await Category.find({

status:true

}).sort({

createdAt:-1

});

res.status(200).json({

success:true,
count:categories.length,
categories

});

}

catch(error){

res.status(500).json({

success:false,
message:error.message

});

}

};
const deleteCategory = async(req,res)=>{

try{

await Category.findByIdAndDelete(

req.params.id

);

res.status(200).json({

success:true,
message:"Category Deleted"

});

}

catch(error){

res.status(500).json({

success:false,
message:error.message

});

}

};
module.exports={

addCategory,

getCategories,

deleteCategory

};