import React, { useState } from "react";
import scholarsDenLogo from "../assets/scholarsDenLogo.png";
import FormHeader from "./FormHeader";
import Spinner from "../../api/Spinner";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Lock,
  Phone,
  Shield,
  AlertCircle,
  LogIn,
  CheckCircle,
  Send,
} from "lucide-react";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const { login } = useAuth();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);
  const [codeEntered, setCodeEntered] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [showCodeBox, setShowCodeBox] = useState(false);
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [codeVerified, setCodeVerified] = useState(true);
  // const [codeVerified, setCodeVerified] = useState(false);
  const [errors, setErrors] = useState({
    phone: "",
  });

  const handleOTPChange = async (e) => {
    if (e.target.value.length <= 4) {
      setCode(e.target.value);
    }

    if (e.target.value.length >= 4) {
      setCodeEntered(true);
      return;
    } else {
      setCodeEntered(false);
    }

    console.log("e.target.value", e.target.value.length);
  };

  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const codeChecked = true;
      // const codeChecked = await checkVerificationCode();

      console.log("codeChecked", codeChecked);

      if (!codeChecked) {
        console.log("Verification failed");
        return;
      }
      const isLogin = await login({ contactNumber: phone });

      console.log("isLogin", isLogin);

      if (isLogin.success) {
        navigate("/adminDashboard");
      }
    } catch (error) {
      console.error("Error from onSubmit:", error);
      setSubmitMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  const checkVerificationCode = async () => {
    setSubmitMessage("");

    if (!phone || !code) {
      setSubmitMessage("Please enter both phone number and verification code.");
      return false;
    }

    try {
      const response = await axios.post("/user/verifyNumber", {
        mobileNumber: phone,
        otp: code,
      });

      console.log("Verification response:", response);

      if (response.status === 200 && response.data.success) {
        setSubmitMessage("Phone number verified successfully!");
        setCodeVerified(true);
        setShowCodeBox(false);
        return true;
      }

      setSubmitMessage("Verification failed. Please check your code.");
      setCodeVerified(false);
      return false;
    } catch (error) {
      console.error("Verification error:", error);

      let errorMessage = "Error verifying phone number.";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.request) {
        errorMessage = "Network error. Please check your internet connection.";
      }

      setSubmitMessage(errorMessage);
      setCodeVerified(false);
      return false;
    }
  };

  const verifyPhoneNo = async () => {
    setLoading(true);
    try {
      if (
        phone == "9719706242" ||
        phone == "9068833360" ||
        phone == "8171091333" ||
        phone == "7037550621"
      ) {
        console.log("Testdata", phone);
        if (!validateForm()) {
          return;
        }

        console.log("verifyPhoneNo function called", phone);

        const response = await axios.post("/user/sendVerification", {
          mobileNumber: `${phone}`,
        });
        if (response.status === 200) {
          setShowCodeBox(true);
          setSubmitMessage("OTP sent successfully");
        }
      } else {
        setSubmitMessage("Access Denied");
      }
    } catch (error) {
      console.log("Error message", error);
      setSubmitMessage(`${error.response.data.message}`);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const formErrors = {};
    let isValid = true;
    const phoneRegex = /^\+91[0-9]{10}$/;

    ["phone"].forEach((field) => {
      if (!phone?.trim()) {
        const formattedField = field
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase());
        formErrors[field] = `${formattedField} is required`;
        isValid = false;
      }
    });

    if (!phoneRegex.test(`+91${phone}`)) {
      formErrors.phone = "Phone must be a valid 10-digit number";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  return (
    <div className="min-h-screen w-full max-w-[768px] mx-auto bg-gradient-to-br from-[#fdf5f6] via-white to-[#f5eff0]">
      {/* Form Header */}
      <FormHeader
        title="Admin Portal"
        subtitle="Secure login for administrators"
        icon={Lock}
      />

      {/* Decorative Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none max-w-[768px] mx-auto">
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-br from-[#ffdd00]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-tr from-[#c61d23]/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative py-8 sm:py-12 md:py-16">
        <div className="max-w-md mx-auto px-3 sm:px-4 md:px-6">
          {/* Login Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-6 sm:p-8">
            {/* Lock Icon Header */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#c61d23] to-[#a01818] rounded-full flex items-center justify-center shadow-lg">
                <Lock size={32} className="text-white" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-2">
              Admin Login
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              Enter your credentials to access the dashboard
            </p>

            {/* Login Form */}
            <form autoComplete="off" onSubmit={onSubmit} className="space-y-5">
              {/* Phone Number Input */}
              <div>
                <label
                  htmlFor="phone"
                  className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-900 mb-2"
                >
                  <Phone size={16} className="text-[#c61d23]" />
                  <span className="flex-1">Phone Number</span>
                  <span className="text-[#c61d23]">*</span>
                </label>
                <div className="flex flex-col gap-2">
                  <div className="relative flex-1">
                    <input
                      autoComplete="off"
                      type="number"
                      id="phone"
                      name="phone"
                      value={phone || ""}
                      onChange={(e) => {
                        if (e.target.value.length < 11) {
                          setPhone(e.target.value);
                        }
                      }}
                      placeholder="Enter 10-digit phone number"
                      className="w-full text-sm sm:text-base border border-gray-200 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-[#c61d23] focus:border-transparent focus:outline-none transition-all"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                      +91
                    </div>
                  </div>
                  {/* {!showCodeBox && !codeVerified && (
                    <button
                      type="button"
                      onClick={verifyPhoneNo}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-blue-500/30 active:scale-95 whitespace-nowrap"
                    >
                      <Send size={16} />
                      <span>Send OTP</span>
                    </button>
                  )} */}
                </div>
                {errors.phone && (
                  <div className="flex items-center gap-2 text-red-500 text-xs mt-2">
                    <AlertCircle size={14} />
                    {errors.phone}
                  </div>
                )}
              </div>

              {/* OTP Input (Only shows when OTP is sent) */}
              {showCodeBox && (
                <div>
                  <label
                    htmlFor="code"
                    className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-900 mb-2"
                  >
                    <Shield size={16} className="text-[#c61d23]" />
                    <span className="flex-1">Verification Code</span>
                    <span className="text-[#c61d23]">*</span>
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    id="code"
                    name="code"
                    value={code}
                    onChange={handleOTPChange}
                    placeholder="Enter 4-digit OTP"
                    maxLength={4}
                    className="w-full text-sm sm:text-base border border-gray-200 rounded-lg p-2.5 sm:p-3 focus:ring-2 focus:ring-[#c61d23] focus:border-transparent focus:outline-none transition-all text-center tracking-widest text-2xl font-bold"
                  />
                  {codeVerified && (
                    <div className="flex items-center gap-2 text-green-600 text-xs mt-2">
                      <CheckCircle size={14} />
                      OTP verified successfully!
                    </div>
                  )}
                </div>
              )}

              {/* Messages */}
              {submitMessage && (
                <div
                  className={`${
                    submitMessage.includes("successfully") ||
                    submitMessage.includes("sent")
                      ? "bg-green-50 border-green-200"
                      : submitMessage.includes("Denied")
                      ? "bg-red-50 border-red-200"
                      : "bg-yellow-50 border-yellow-200"
                  } border rounded-lg p-3 flex items-start gap-2`}
                >
                  <AlertCircle
                    size={14}
                    className={`${
                      submitMessage.includes("successfully") ||
                      submitMessage.includes("sent")
                        ? "text-green-600"
                        : submitMessage.includes("Denied")
                        ? "text-red-600"
                        : "text-yellow-600"
                    } flex-shrink-0 mt-0.5`}
                  />
                  <p
                    className={`text-xs ${
                      submitMessage.includes("successfully") ||
                      submitMessage.includes("sent")
                        ? "text-green-700"
                        : submitMessage.includes("Denied")
                        ? "text-red-700"
                        : "text-yellow-700"
                    }`}
                  >
                    {submitMessage}
                  </p>
                </div>
              )}

              {/* Loading Spinner */}
              {loading && (
                <div className="flex justify-center items-center py-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-3 border-[#c61d23] border-t-transparent"></div>
                </div>
              )}

              {/* Login Button */}
              {/* {showCodeBox && ( */}
              <button
                type="submit"
                // disabled={!codeEntered || loading}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#c61d23] to-[#a01818] hover:from-[#b01820] hover:to-[#8f1515] text-white text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              >
                <LogIn size={18} />
                <span>{loading ? "Logging in..." : "Login"}</span>
              </button>
              {/* )} */}
            </form>

            {/* Security Note */}
            <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
                <Shield
                  size={16}
                  className="text-blue-600 flex-shrink-0 mt-0.5"
                />
                <p className="text-xs text-blue-700">
                  This portal is restricted to authorized administrators only.
                  All login attempts are logged.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Logo */}
          {/* <div className="flex justify-center items-center py-8 mt-6">
            <img
              className="w-20 sm:w-24 opacity-60 hover:opacity-100 transition-opacity"
              src={scholarsDenLogo}
              alt="Scholars Den Logo"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
