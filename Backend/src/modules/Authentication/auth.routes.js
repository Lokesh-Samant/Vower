const express = require("express");
const router = express.Router();

const AuthController = require("./auth.controller");
const ForgetPasswordController = require("./ForgetPassword.controller")

router.post("/signup/email/send-otp", AuthController.sendOTP);
router.post("/signup/email/verify-otp",AuthController.verifyOTP);

router.post("/signup/email",AuthController.signUpEmail);
router.post("/signup/phone",AuthController.signUpPhone);

router.post("/login/phone",AuthController.loginPhone);
router.post("/login/email",AuthController.loginEmail);

router.post("/google",AuthController.googleAuth);
router.post("/logout", AuthController.logout);

router.post("/reset-password" , ForgetPasswordController.Resetpassword)
router.post("/reset-password/send-otp" ,ForgetPasswordController.sendPasswordOTP )
router.post("/reset-password/verify-otp" , ForgetPasswordController.VerifyPasswordOTP)

module.exports = router;