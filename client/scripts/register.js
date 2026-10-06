const registerForm =
document.getElementById("registerForm");
const sendEmailOtpBtn =
document.getElementById("sendEmailOtpBtn");

const emailOtpInput =
document.getElementById("emailOtp");

const verifyOtpContainer =
document.getElementById("verifyOtpContainer");
const verifyEmailOtpBtn =
document.getElementById("verifyEmailOtpBtn");
const emailInput =
document.getElementById("email");
let isEmailVerified = false;
if (registerForm) {

    registerForm.addEventListener("submit", registerUser);

}
if (sendEmailOtpBtn) {

    sendEmailOtpBtn.addEventListener("click", sendEmailOTP);

}
if (verifyEmailOtpBtn) {

    verifyEmailOtpBtn.addEventListener("click", verifyEmailOTP);

}
async function registerUser(event) {

    event.preventDefault();

    const fullName =
    document.getElementById("fullName").value.trim();

    const companyName =
    document.getElementById("companyName").value.trim();

    const email =
    document.getElementById("email").value.trim();

    const phone =
    document.getElementById("phone").value.trim();

    const password =
    document.getElementById("password").value;

    const confirmPassword =
    document.getElementById("confirmPassword").value;

    if (

        !fullName ||
        !companyName ||
        !email ||
        !phone ||
        !password ||
        !confirmPassword

    ) {

        alert("Please fill all fields.");

        return;

    }

    if (password !== confirmPassword) {

        alert("Passwords do not match.");

        return;

    }
    if (!isEmailVerified) {

    alert("Please verify your email before creating your account.");

    return;

}
    try {

        const response = await fetch(

            "http://localhost:5000/api/auth/register",

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    fullName,

                    companyName,

                    email,

                    phone,

                    password

                })

            }

        );

        const data = await response.json();

        if (data.success) {

            alert("Registration Successful");

            window.location.href = "./login.html";

        }

        else {

            alert(data.message);

        }

    }

    catch (error) {

        alert("Server Error");

        console.log(error);

    }

}
async function sendEmailOTP() {

    const email = emailInput.value.trim();

    if (!email) {

        alert("Please enter your email first.");

        return;

    }

    try {

        const response = await fetch(

            "http://localhost:5000/api/auth/send-email-otp",

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    email

                })

            }

        );

        const data = await response.json();

        if (data.success) {

            alert("OTP sent successfully.");

            emailOtpInput.style.display = "block";

            verifyOtpContainer.style.display = "block";

        }

        else {

            alert(data.message);

        }

    }

    catch (error) {

        console.log(error);

        alert("Server Error");

    }

}
async function verifyEmailOTP() {

    const email = emailInput.value.trim();

    const otp = emailOtpInput.value.trim();

    if (!otp) {

        alert("Please enter the OTP.");

        return;

    }

    try {

        const response = await fetch(

            "http://localhost:5000/api/auth/verify-email-otp",

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    email,
                    otp

                })

            }

        );

        const data = await response.json();

        if (data.success) {

            isEmailVerified = true;

            alert("Email verified successfully.");

            verifyEmailOtpBtn.disabled = true;

            sendEmailOtpBtn.disabled = true;

        }

        else {

            alert(data.message);

        }

    }

    catch (error) {

        console.log(error);

        alert("Server Error");

    }

}