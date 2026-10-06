const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(

{

companyName:{
type:String,
required:true,
trim:true
},

companyCode:{
type:String,
required:true,
unique:true,
trim:true,
uppercase:true
},

owner:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},

businessEmail:{
type:String,
required:true,
trim:true,
lowercase:true,
validate:{
validator:function(value){
return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
},
message:"Please enter a valid email address"
}
},

businessPhone:{
type:String,
required:true,
trim:true,
match:[
/^[6-9]\d{9}$/,
"Please enter a valid 10-digit mobile number"
]
},

gstNumber:{
type:String,
trim:true,
uppercase:true,
default:"",
validate:{
validator:function(value){
return value === "" ||
/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/.test(value);
},
message:"Please enter a valid GST number"
}
},

website:{
type:String,
default:""
},

logo:{
type:String,
default:""
},

address:{
type:String,
default:""
},

city:{
type:String,
default:""
},

state:{
type:String,
default:""
},

country:{
type:String,
default:"India"
},

currency:{
type:String,
default:"INR"
},

timezone:{
type:String,
default:"Asia/Kolkata"
},

emailVerified:{
type:Boolean,
default:false
},

phoneVerified:{
type:Boolean,
default:false
},

subscriptionPlan:{
type:String,
enum:[
"Trial",
"Basic",
"Pro",
"Enterprise"
],
default:"Trial"
},

subscriptionActive:{
type:Boolean,
default:false
},

employeeLimit:{
type:Number,
default:5
},

trialStart:{
type:Date,
default:Date.now
},

trialEnd:{
type:Date,
default:()=>new Date(
Date.now()+24*60*60*1000
)
},

status:{
type:Boolean,
default:true
}

},

{

timestamps:true

}

);

module.exports=

mongoose.model(

"Company",

companySchema

);