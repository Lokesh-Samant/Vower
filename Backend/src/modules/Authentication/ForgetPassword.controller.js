const { getDeviceInfo } = require("../../utils/DeviceInfo");

const SendOTPService = require('./services/sendOTP.resetPassword.service')
const VerifyOTPService = require('./services/VerifyOTP.resetPassword.service')
const ForgetPasswordService = require('./services/resetPassword.service')

const Resetpassword = async (req, res)=>{
try {
    const { email, password , verificationToken} = req.body;
    const result = await ForgetPasswordService({
      email,
      password,
      verificationToken,
    });

    return res.status(result.code).json({
      msg: result.msg,
    });
  } catch (error) {
    console.error("password reset error server:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}

const VerifyPasswordOTP = async (req, res)=>{
try {
    const { email, otp } = req.body;
    const result = await VerifyOTPService({
      email,
      otp,
    });

    return res.status(result.code).json({
      msg: result.msg,
      verificationToken: result.verificationToken
    });
  } catch (error) {
    console.error("Verification otp error:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}

const sendPasswordOTP = async (req, res)=>{
try {
    const { email } = req.body;
    const result = await SendOTPService({
      email,
    });

    return res.status(result.code).json({
      msg: result.msg,
    });
  } catch (error) {
    console.error("sending otp error:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}

module.exports = {
  Resetpassword,
  sendPasswordOTP,
  VerifyPasswordOTP,
};