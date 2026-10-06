let selectedRole = "user";

const userRole = document.getElementById("userRole");
const adminRole = document.getElementById("adminRole");

const loginForm = document.getElementById("loginForm");

if (userRole && adminRole) {

    userRole.addEventListener("click", () => {

        selectedRole = "user";

        userRole.classList.add("active-role");
        adminRole.classList.remove("active-role");

    });

    adminRole.addEventListener("click", () => {

        selectedRole = "admin";

        adminRole.classList.add("active-role");
        userRole.classList.remove("active-role");

    });

}

if (loginForm) {

    loginForm.addEventListener("submit", loginUser);

}

async function loginUser(event) {

    event.preventDefault();

    const email =
    document.getElementById("email").value.trim();

    const password =
    document.getElementById("password").value;

    if (!email || !password) {

        alert("Please enter Email and Password.");

        return;

    }

    try {

        const response = await fetch(

            "http://localhost:5000/api/auth/login",

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    email,

                    password

                })

            }

        );

        const data = await response.json();

        if (!data.success) {

            alert(data.message);

            return;

        }

        localStorage.setItem(

            "token",

            data.token

        );

        localStorage.setItem(

            "user",

            JSON.stringify(data.user)

        );

        if (

            selectedRole === "admin" &&

            data.user.role !== "owner"

        ) {

            alert(

                "Only Company Owner can login from Admin Login."

            );

            return;

        }

        if (

            selectedRole === "user" &&

            data.user.role !== "employee"

        ) {

            alert(

                "Employee account required."

            );

            return;

        }

        if (

            data.user.role === "owner"

        ) {

            window.location.href =

            "./admin-dashboard.html";

        }

        else {

            window.location.href =

            "./user-dashboard.html";

        }

    }

    catch (error) {

        console.log(error);

        alert("Server Error");

    }

}