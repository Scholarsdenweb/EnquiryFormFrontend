import React, { useState } from "react";

import scholarsDenLogo from "../assets/scholarsDenLogo.png";
import FormHeader from "./FormHeader";

import { useDispatch, useSelector } from "react-redux";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const AdminSignup = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);
  const [codeEntered, setCodeEntered] = useState(false);

  const [submitMessage, setSubmitMessage] = useState("");

  const [showCodeBox, setShowCodeBox] = useState(false);

  const [code, setCode] = useState("");

  const [phone, setPhone] = useState("");
  const [codeVerified, setCodeVerified] = useState(false);
  // const [codeVerified, setCodeVerified] = useState(true);
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
      let codeChecked = await checkVerificationCode();

      console.log("codeChecked", codeChecked);

      console.log("Button Clicked");
      if (codeChecked === false) {
        return true;
      } else {
        document.cookie = `phone=${phone}; path=/`;
        navigate("/adminDashboard");
      }
      document.cookie = `phone=${phone}; path=/`;
      navigate("/adminDashboard");
    } catch (error) {
      console.log("error from onSubmit", error);
    } finally {
      //   await dispatch(setLoading(false));
    }
  };

  const verifyPhoneNo = async () => {
    try {
      if (!validateForm()) {
        return;
      }

      console.log("verifyPhoneNo function called", phone);
      setShowCodeBox(true);

      const response = await axios.post("/user/sendVerification", {
        mobileNumber: `${phone}`,
      });
      if (response.status === 200) {
        setShowCodeBox(true);
        setSubmitMessage("OTP sent successfully");
      }
    } catch (error) {
      console.log("Error message", error);
      setSubmitMessage(`${error.response.data.message}`);
    } finally {
      //   dispatch(setLoading(false));
      // setShowCodeBox(true);
    }
  };

  const validateForm = () => {
    const formErrors = {};
    let isValid = true;
    const phoneRegex = /^\+91[0-9]{10}$/;

    // Field validation
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
      formErrors.phone = "fatherContactNumber must be a valid 10-digit number";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  //   const validation = () => {
  //     const phoneRegex = /^\+91[0-9]{10}$/;
  //     const phoneNumber = phone.replace(/\D/g, "");

  //     if (!phoneNumber.match(phoneNumber)) {
  //       alert("Please enter a valid phone number");
  //       return false;
  //     }
  //     if (!phoneRegex.test(`+91${userData.fatherContactNumber}`)) {
  //       return false;
  //     }

  //     return true;
  //   };

  const checkVerificationCode = async () => {
    try {
      const response = await axios.post("/user/verifyNumber", {
        mobileNumber: `${phone}`,
        otp: code,
      });
      console.log("response from checkVerificationCode", response);
      if (response.status === 200) {
        setSubmitMessage("Phone number verified successfully!");
        setCodeVerified(true);
        setShowCodeBox(false);
        return true;
      }
      setCodeVerified(true);
      setShowCodeBox(false);
      return true;
    } catch (error) {
      console.log("Error messagefor checkVerificationCode", error);
      //   setSubmitMessage("Error verifying fatherContactNumber number");
      return false;
    } finally {
      //   dispatch(setLoading(false));
    }
  };

  return (
    <div
      className="overflow-auto items-center px-2 sm:px-6 max-w-{768px] h-screen"
      style={{ backgroundColor: "#c61d23" }}
    >
      {loading && <Spinner />}
      <div className="grid grid-rows-8 flex-col w-full h-full">
        <div className="row-span-2">
          <FormHeader />
        </div>

        <div className="row-span-4 px-3 sm:px-9 flex flex-col justify-center items-center gap-6 overflow-auto">
          <div className=" w-full sm:w-2/3">
            <div
              className="flex flex-col gap-4"
              style={{ backgroundColor: "#c61d23" }}
            >
              <h1 className="text-4xl font-semibold text-white text-center mb-6">
                Admin Signup
              </h1>
              <form
                autoComplete="off"
                className="bg-white/10 backdrop-blur-md shadow-lg p-6 rounded-xl w-full max-w-lg space-y-6 text-white"
                onSubmit={onSubmit}
              >
                <div className="w-full flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex flex-col justify-center w-full">
                      <input
                        autoComplete="off"
                        type="tel"
                        id="phone"
                        name="phone"
                        value={phone || ""}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="*Contact Number"
                        className="border-b-2 border-gray-300 focus:outline-none text-black w-full text-lg rounded-lg p-3"
                        style={{ backgroundColor: "#f3f3f3" }}
                      />
                      {errors.phone && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    {!showCodeBox && !codeVerified && (
                      <button
                        type="button"
                        onClick={verifyPhoneNo}
                        className="px-4 py-2 sm:py-0 rounded-md bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                      >
                        Send OTP
                      </button>
                    )}
                  </div>

                  {showCodeBox && (
                    <div className="flex flex-col w-full max-w-sm gap-3">
                      <input
                        autoComplete="off"
                        type="text"
                        id="code"
                        name="code"
                        value={code}
                        onChange={handleOTPChange}
                        placeholder="*Verification Code"
                        className="w-full bg-white/20 text-white border border-white px-4 py-2  focus:outline-none placeholder-gray-400"
                      />
                    </div>
                  )}
                </div>

                {showCodeBox && (
                  <button
                    type="submit"
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded-xl transition-all disabled:bg-yellow-800"
                    disabled={!codeEntered}
                  >
                    Next
                  </button>
                )}
                {/* <button
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded-xl transition-all"
                  type="submit"
                >
                  Login
                </button> */}
              </form>
            </div>
          </div>
        </div>

        <div className="row-span-1 w-full h-full flex justify-center items-center">
          <div className="w-24">
            <img src={scholarsDenLogo} alt="Scholars Den Logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
