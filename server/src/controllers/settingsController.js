const Settings = require("../models/Settings");

const saveSettings = async (req,res)=>{

try{

const{

companyName,
businessEmail,
businessPhone,
gstNumber,
businessAddress,
website,
invoicePrefix,
currency,
financialYear,
defaultGST,
invoiceTheme

}=req.body;

let settings = await Settings.findOne();

if(settings){

settings.companyName = companyName;
settings.businessEmail = businessEmail;
settings.businessPhone = businessPhone;
settings.gstNumber = gstNumber;
settings.businessAddress = businessAddress;
settings.website = website;
settings.invoicePrefix = invoicePrefix;
settings.currency = currency;
settings.financialYear = financialYear;
settings.defaultGST = defaultGST;
settings.invoiceTheme = invoiceTheme;

await settings.save();

}
else{

settings = await Settings.create({

companyName,
businessEmail,
businessPhone,
gstNumber,
businessAddress,
website,
invoicePrefix,
currency,
financialYear,
defaultGST,
invoiceTheme

});

}

res.status(200).json({

success:true,
message:"Settings Saved Successfully",
settings

});

}

catch(error){

res.status(500).json({

success:false,
message:error.message

});

}

};

const getSettings = async(req,res)=>{

try{

const settings =
await Settings.findOne();

res.status(200).json({

success:true,
settings

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

saveSettings,
getSettings

};