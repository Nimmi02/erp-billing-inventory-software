const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(

{

categoryName:{

type:String,

required:true,

trim:true

},

description:{

type:String,

default:""

},

status:{

type:Boolean,

default:true

},

companyId:{

type:mongoose.Schema.Types.ObjectId,

ref:"Company",

required:true

}

},

{

timestamps:true

}

);
categorySchema.index(
    { companyId: 1, categoryName: 1 },
    { unique: true }
);
module.exports =
mongoose.model(
"Category",
categorySchema
);