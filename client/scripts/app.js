let selectedRole = "user";

const userRole =
document.getElementById("userRole");

const adminRole =
document.getElementById("adminRole");

if(userRole && adminRole){

    userRole.addEventListener("click",()=>{

        selectedRole = "user";

        userRole.classList.add("active-role");
        adminRole.classList.remove("active-role");

    });

    adminRole.addEventListener("click",()=>{

        selectedRole = "admin";

        adminRole.classList.add("active-role");
        userRole.classList.remove("active-role");

    });

}
const loginBtn =
document.getElementById("loginBtn");

const loginForm =
document.getElementById("loginForm");

function loginUser(){

    if(selectedRole === "admin"){

        localStorage.setItem("erpRole","admin");

        window.location.href =
        "./admin-dashboard.html";

    }
    else{

        localStorage.setItem("erpRole","user");

        window.location.href =
        "./user-dashboard.html";

    }

}

if(loginBtn){

    loginBtn.addEventListener("click",loginUser);

}

if(loginForm){

    loginForm.addEventListener("submit",(e)=>{

        e.preventDefault();

        loginUser();

    });

}