const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(

{

companyName:{

type:String,

required:true

},

businessEmail:{

type:String,

required:true

},

businessPhone:{

type:String,

default:""

},

gstNumber:{

type:String,

default:""

},

businessAddress:{

type:String,

default:""

},

website:{

type:String,

default:""

},

invoicePrefix:{

type:String,

default:"INV"

},

currency:{

type:String,

default:"INR"

},

financialYear:{

type:String,

default:""

},

defaultGST:{

type:Number,

default:18

},

invoiceTheme:{

type:String,

default:"Professional"

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
settingsSchema.index(
    { companyId: 1 },
    { unique: true }
);
module.exports = mongoose.model(

"Settings",

settingsSchema

);