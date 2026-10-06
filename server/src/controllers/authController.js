const User = require("../models/User");
const Company = require("../models/Company");
const OTP = require("../models/OTP");
const VerificationSession = require("../models/VerificationSession");
const generateOTP = require("../utils/generateOTP");
const generateCompanyCode = require("../utils/generateCompanyCode");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
    try {

        const {
            fullName,
            companyName,
            email,
            phone,
            password
        } = req.body;


        if (
            !fullName ||
            !companyName ||
            !email ||
            !phone ||
            !password
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields"
            });
        }

        
        const existingUser = await User.findOne({
            email
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }
        const verificationSession = await VerificationSession.findOne({

    email,
    purpose: "EMAIL_VERIFICATION"

});

if (!verificationSession) {

    return res.status(400).json({

        success: false,
        message: "Please verify your email before registering."

    });

}

if (verificationSession.expiresAt < new Date()) {

    await VerificationSession.deleteOne({

        _id: verificationSession._id

    });

    return res.status(400).json({

        success: false,
        message: "Email verification has expired. Please verify again."

    });

}
        const hashedPassword = await bcrypt.hash(password, 10);


        const companyCode =
generateCompanyCode();

const newUser =
await User.create({

fullName,

companyName,

email,

phone,

password: hashedPassword

});

const company =
await Company.create({

    companyName,

    companyCode,

    owner: newUser._id,

    businessEmail: email,

    businessPhone: phone

});
newUser.companyId =
company._id;

await newUser.save();
await VerificationSession.deleteOne({

    _id: verificationSession._id

});
        res.status(201).json({

            success: true,
            message: "Registration Successful",

            user: {

                id: newUser._id,
                fullName: newUser.fullName,
                companyName: newUser.companyName,
                email: newUser.email,
                role: newUser.role

            }

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }
};
const sendEmailOTP = async (req, res) => {

    try {

        const { email } = req.body;

        if (!email) {

            return res.status(400).json({

                success: false,
                message: "Email is required"

            });

        }

        const otp = generateOTP();

        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await OTP.deleteMany({

            email,
            purpose: "EMAIL_VERIFICATION"

        });

        await OTP.create({

            email,
            otp,
            purpose: "EMAIL_VERIFICATION",
            expiresAt

        });

        return res.status(200).json({

            success: true,
            message: "OTP generated successfully"

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

};
const verifyEmailOTP = async (req, res) => {

    try {

        const { email, otp } = req.body;

        if (!email || !otp) {

            return res.status(400).json({

                success: false,
                message: "Email and OTP are required"

            });

        }

        const savedOTP = await OTP.findOne({

            email,
            purpose: "EMAIL_VERIFICATION"

        });

        if (!savedOTP) {

            return res.status(404).json({

                success: false,
                message: "OTP not found"

            });

        }

        if (savedOTP.expiresAt < new Date()) {

            await OTP.deleteOne({ _id: savedOTP._id });

            return res.status(400).json({

                success: false,
                message: "OTP has expired"

            });

        }

        if (savedOTP.otp !== otp) {

            savedOTP.attempts += 1;

            await savedOTP.save();

            return res.status(400).json({

                success: false,
                message: "Invalid OTP"

            });

        }

        await OTP.deleteOne({

    _id: savedOTP._id

});

await VerificationSession.deleteMany({

    email,
    purpose: "EMAIL_VERIFICATION"

});

await VerificationSession.create({

    email,
    purpose: "EMAIL_VERIFICATION",
    expiresAt: new Date(Date.now() + 15 * 60 * 1000)

});

return res.status(200).json({

    success: true,
    message: "Email verified successfully"

});

    }

    catch (error) {

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

};
const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {

            return res.status(400).json({

                success: false,
                message: "Email and Password are required"

            });

        }

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(401).json({

                success: false,
                message: "Invalid Email or Password"

            });

        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {

            return res.status(401).json({

                success: false,
                message: "Invalid Email or Password"

            });

        }
        if (

    user.role === "owner" &&

    !user.subscriptionActive &&

    new Date() > user.trialEnd

) {

    return res.status(403).json({

        success: false,

        message: "Your 24-hour trial has expired. Please purchase a subscription."

    });

}

        const token = jwt.sign(

    {
        id: user._id,
        role: user.role
    },

    process.env.JWT_SECRET,

    {
        expiresIn: process.env.JWT_EXPIRE
    }

);

res.status(200).json({

    success: true,
    message: "Login Successful",

    token,

    user: {

        id: user._id,
        fullName: user.fullName,
        companyName: user.companyName,
        email: user.email,
        role: user.role

    }

});

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};
module.exports = {
    register,
    sendEmailOTP,
    verifyEmailOTP,
    login
};