function generateCompanyCode(){

const randomCode =
Math.random()
.toString(36)
.substring(2,8)
.toUpperCase();

return "ERP-" + randomCode;

}

module.exports =
generateCompanyCode;