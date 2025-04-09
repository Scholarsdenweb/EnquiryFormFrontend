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
  const [submitMessage, setSubmitMessage] = useState("");

  const [showCodeBox, setShowCodeBox] = useState(false);

  const [code, setCode] = useState("");

  const [phone, setPhone] = useState("");
  const [codeVerified, setCodeVerified] = useState(false);
  const [errors, setErrors] = useState({
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let codeChecked = await checkVerificationCode();

      console.log("codeChecked", codeChecked);

      console.log("Button Clicked");
      if (codeChecked === false) {
        return true;
      }else{
        document.cookie = `phone=${phone}; path=/`;
        navigate("/adminDashboard");
      }
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
      className="overflow-auto w-full items-center px-6 "
      style={{ backgroundColor: "#c61d23", paddingBottom: "3px" }}
    >
      {loading && <Spinner />}
      <div className="grid grid-rows-8 flex-col w-full h-full ">
        <div className="row-span-2">
          <FormHeader />
        </div>

        <div className=" row-span-5 px-9 flex flex-col justify-center items-center gap-6 overflow-auto ">
          <div className="w-2/3  ">
            <div
              className="flex flex-col gap-2"
              style={{ backgroundColor: "#c61d23" }}
            >
              <h1 className="text-4xl font-normal px-4 pt-5 text-white w-full text-center mb-4">
                Enquiry Form
              </h1>
              <form
                autoComplete="off"
                className="flex flex-col justify-center items-center gap-4 w-full p-2 "
                onSubmit={onSubmit}
              >
                <div className="flex gap-3 flex-col w-2/3">
                  <div className="flex-1 flex justify-center items-center w-full">
                    <input
                      autoComplete="off"
                      type="tel"
                      id="phone"
                      name="phone"
                      value={phone || ""}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="*Contact no (Parents)"
                      className="border-b-2 border-gray-300 py-2 focus:outline-none flex-1 my-auto placeholder-white"
                      style={{ backgroundColor: "#c61d23" }}
                    />
                    {!showCodeBox && !codeVerified && (
                      <div className="flex">
                        <button
                          type="button"
                          onClick={verifyPhoneNo}
                          className="px-4 py-y border-2 text-white bg-blue-500 hover:bg-blue-600 rounded-full"
                          style={{ backgroundColor: "#c61d23" }}
                        >
                          Send OTP
                        </button>
                      </div>
                    )}
                  </div>
                  {errors.phone && (
                    <p className="text-white text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
                <div className="flex gap-3   justify-center w-2/3">
                  <div className="flex-1 flex flex-col">
                    <input
                      autoComplete="off"
                      type="text"
                      id="code"
                      name="code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="*Verification Code"
                      className="border-b-2 border-gray-300  py-2 focus:outline-none w-4/5 placeholder-white"
                      style={{ backgroundColor: "#c61d23" }}
                    />
                    {/* <button
                    type="button"
                    onClick={checkVerificationCode}
                    className="px-4 py-2 border-2 text-white bg-blue-500 hover:bg-blue-600 rounded-full"
                    style={{ backgroundColor: "#c61d23" }}
                  >
                    Verify
                  </button> */}
                  </div>
                </div>
                <button
                  className="border text-white p-2 rounded-lg w-1/3"
                  type="submit"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="row-span-1 w-full h-full flex  justify-center items-center ">
          {/* <div className=""> */}
          <div className=" w-24 ">
            <img src={scholarsDenLogo} alt="" />
          </div>
          {/* </div>  */}
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
