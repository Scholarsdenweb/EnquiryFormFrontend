

// import ScholarsDenLogo from "../assets/scholarsDenLogo.png";

// const SignupForm = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [isSubmittingForm, setIsSubmittingForm] = useState(false);

//   const [code, setCode] = useState("");
//   const [showCodeBox, setShowCodeBox] = useState(false);
//   const { userData, dataExist, error } = useSelector(
//     (state) => state.userDetails
//   );

//   const { loading } = useSelector((state) => state.loadingDetails);

//   const [submitMessage, setSubmitMessage] = useState("");
//   const [codeEntered, setCodeEntered] = useState(false);

//   const [showLoadingPage, setShowLoadingPage] = useState(false);

//   const phoneRegex = /^\+91[0-9]{10}$/;
//   // const [codeVerified, setCodeVerified] = useState(true);
//   const [codeVerified, setCodeVerified] = useState(false);

//   // State hooks
//   const [errors, setErrors] = useState({
//     fatherContactNumber: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     console.log("name", name, "value", value);

//     if (name === "fatherContactNumber") {
//       if (value.length > 10) {
//         return;
//       }
//     }

//     dispatch(updateUserDetails({ [name]: value }));

//     if (value.trim()) {
//       setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
//     }
//   };

//   useEffect(() => {
//     console.log("userData from useEffect", userData);
//   }, [userData]);

//   const validateForm = () => {
//     const formErrors = {};
//     let isValid = true;

//     // Field validation
//     ["fatherContactNumber"].forEach((field) => {
//       const formattedField = field
//         .replace(/([A-Z])/g, " $1")
//         .replace(/^./, (str) => str.toUpperCase());
//       if (!userData[field]?.trim()) {
//         formErrors[field] = `${formattedField} is required`;
//         isValid = false;
//       }

//       if (!phoneRegex.test(`+91${userData.fatherContactNumber}`)) {
//         formErrors.fatherContactNumber = `${formattedField} must be a valid 10-digit number`;
//         isValid = false;
//       }
//     });

//     setErrors(formErrors);
//     return isValid;
//   };

//   // useEffect(() => {
//   //   dispatch(fetchUserDetails());
//   // }, []);

//   // useEffect(() => {
//   //   console.log("error in useEffect", error);
//   // }, [error]);

//   // useEffect(() => {
//   //   if (document.cookie !== "") {
//   //     navigate("/enquiryform");
//   //   }
//   // }, [dataExist, userData]);

//   const verifyPhoneNo = async () => {
//     try {
//       if (!validateForm()) {
//         return;
//       }

//       dispatch(setLoading(true));
//       // setShowCodeBox(true);

//       const response = await axios.post("/user/sendVerification", {
//         mobileNumber: `${userData.fatherContactNumber}`,
//       });
//       if (response.status === 200) {
//         setShowCodeBox(true);
//         setSubmitMessage("OTP sent successfully"); // Update the message to "OTP sent successfully" in the set
//       }
//     } catch (error) {
//       console.log("Error message", error);
//       setSubmitMessage(`${error?.response?.data?.message?.message}`);
//     } finally {
//       dispatch(setLoading(false));
//       // setShowCodeBox(true);
//     }
//   };

//   const checkVerificationCode = async () => {
//     try {
//       dispatch(setLoading(true));
//       const response = await axios.post("/user/verifyNumber", {
//         mobileNumber: `${userData.fatherContactNumber}`,
//         otp: code,
//       });
//       console.log("response from checkVerificationCode", response);
//       if (response.status === 200) {
//         // setSubmitMessage("fatherContactNumber number verified successfully!");
//         setCodeVerified(true);
//         // setShowCodeBox(false);
//         return true;
//       }
//       // setCodeVerified(true);
//       // setShowCodeBox(false);
//       // return true;
//     } catch (error) {
//       console.log("Error message for checkVerificationCode", error);
//       setSubmitMessage("Invalid OTP. Please try again.");
//       return false;
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setIsSubmittingForm(true); // ⬅️ Only show LoadingPage now

//       let codeChecked = await checkVerificationCode();
//       // let codeChecked = true;
//       if (codeChecked === false) {
//         // setShowCodeBox(false);
//         setCodeVerified(false);
//         // setSubmitMessage("Please Verify Your Phone Number");
//         setIsSubmittingForm(false); // ⬅️ reset if verification fails
//         return;
//       }

//       if (validateForm()) {
//         await dispatch(submitFormData(userData));
//         navigate("/firstPage");

//         // if (document.cookie !== "") {
//         //   setShowLoadingPage(true); // Show your full-screen LoadingPage

//         //   setTimeout(() => {

//         //     setShowLoadingPage(false);
//         //   }, 3000);
//         // }

//         console.log("userData for onSubmit", userData);
//       }
//     } catch (error) {
//       console.log("error from onSubmit", error);
//       setIsSubmittingForm(false); // ⬅️ always reset this
//     }
//   };


  

//   const handleOTPChange = async (e) => {
//     if (e.target.value.length <= 4) {
//       setCode(e.target.value);
//     }

//     if (e.target.value.length >= 4) {
//       setCodeEntered(true);
//       return;
//     } else {
//       setCodeEntered(false);
//     }

//     console.log("e.target.value", e.target.value.length);
//   };

//   return (
//     <div className=" w-full bg-[#c61d23] flex items-center justify-center px-4 py-1">
//       {isSubmittingForm && showLoadingPage && <LoadingPage />}

//       <form
//         onSubmit={onSubmit}
//         className="bg-white/10 backdrop-blur-md shadow-lg p-6 rounded-xl w-full max-w-lg space-y-6 text-white"
//       >
//         <h2 className="text-center text-2xl md:text-3xl font-semibold">
//           Phone Number Verification
//         </h2>

//         <div className="space-y-4">
//           <label
//             htmlFor="fatherContactNumber"
//             className="block text-sm font-medium"
//           >
//             *Contact Number (Parent)
//           </label>
//           <div className="flex flex-col md:flex-row gap-2">
//             <input
//               type="number"
//               id="fatherContactNumber"
//               name="fatherContactNumber"
//               value={userData?.fatherContactNumber || ""}
//               onChange={handleChange}
//               placeholder="Enter Contact Number"
//               className="flex-1 bg-white/10 text-white border border-white px-4 py-2 focus:outline-none placeholder-gray-400"
//             />
//             {!showCodeBox && !codeVerified && (
//               <button
//                 type="button"
//                 onClick={verifyPhoneNo}
//                 className="px-4 py-2 rounded-md bg-yellow-500 hover:bg-yellow-600 text-black font-semibold "
//               >
//                 Send OTP
//               </button>
//             )}
//           </div>
//           {errors.fatherContactNumber && (
//             <p className="text-sm text-yellow-300">
//               {errors.fatherContactNumber}
//             </p>
//           )}
//         </div>

//         {/* OTP Input */}
//          {showCodeBox && (
//           <div className="space-y-2">
//             <label htmlFor="otp" className="block text-sm font-medium">
//               *Verification Code
//             </label>
//             <input
//               type="text"
//               id="otp"
//               name="otp"
//               value={code}
//               onChange={handleOTPChange}
//               placeholder="Enter OTP"
//               className="w-full bg-white/20 text-white border border-white px-4 py-2 focus:outline-none placeholder-gray-400"
//             />
//           </div>
//         )}

//         {/* Message */}
//         {submitMessage && (
//           <p className="text-sm text-center text-yellow-300">{submitMessage}</p>
//         )}
//         {error && <p className="text-sm text-center text-red-300">{error}</p>}

//         {!isSubmittingForm && loading && (
//           <div className="flex justify-center items-center">
//             <div className="animate-spin  rounded-full h-5 w-5 border-b-2 border-white"></div>
//           </div>
//         )}

//         {/* Submit */}

//         {/* {showCodeBox && ( */}
//         <button
//           type="submit"
//           className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded-xl transition-all disabled:bg-yellow-800"
//           // disabled={!codeEntered}
//         >
//           Next
//         </button>
//         {/* )}  */}
//       </form>
//     </div>
//   );
// };

// export default SignupForm;







import { Phone, Shield, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";
import {
  fetchUserDetails,
  submitFormData,
  updateUserDetails,
} from "../../redux/formDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { loading, setLoading } from "../../redux/loadingSlice";
import Spinner from "./Spinner";
import LoadingPage from "./LoadingPage";

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const [code, setCode] = useState("");
  const [showCodeBox, setShowCodeBox] = useState(false);
  const { userData, dataExist, error } = useSelector(
    (state) => state.userDetails
  );

  const { loading } = useSelector((state) => state.loadingDetails);

  const [submitMessage, setSubmitMessage] = useState("");
  const [codeEntered, setCodeEntered] = useState(false);

  const [showLoadingPage, setShowLoadingPage] = useState(false);

  const phoneRegex = /^\+91[0-9]{10}$/;
  // const [codeVerified, setCodeVerified] = useState(true);
  const [codeVerified, setCodeVerified] = useState(false);

  // State hooks
  const [errors, setErrors] = useState({
    fatherContactNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name", name, "value", value);

    if (name === "fatherContactNumber") {
      if (value.length > 10) {
        return;
      }
    }

    dispatch(updateUserDetails({ [name]: value }));

    if (value.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  useEffect(() => {
    console.log("userData from useEffect", userData);
  }, [userData]);

  const validateForm = () => {
    const formErrors = {};
    let isValid = true;

    // Field validation
    ["fatherContactNumber"].forEach((field) => {
      const formattedField = field
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
      if (!userData[field]?.trim()) {
        formErrors[field] = `${formattedField} is required`;
        isValid = false;
      }

      if (!phoneRegex.test(`+91${userData.fatherContactNumber}`)) {
        formErrors.fatherContactNumber = `${formattedField} must be a valid 10-digit number`;
        isValid = false;
      }
    });

    setErrors(formErrors);
    return isValid;
  };

  // useEffect(() => {
  //   dispatch(fetchUserDetails());
  // }, []);

  // useEffect(() => {
  //   console.log("error in useEffect", error);
  // }, [error]);

  // useEffect(() => {
  //   if (document.cookie !== "") {
  //     navigate("/enquiryform");
  //   }
  // }, [dataExist, userData]);

  const verifyPhoneNo = async () => {
    try {
      if (!validateForm()) {
        return;
      }

      dispatch(setLoading(true));
      // setShowCodeBox(true);

      const response = await axios.post("/user/sendVerification", {
        mobileNumber: `${userData.fatherContactNumber}`,
      });
      if (response.status === 200) {
        setShowCodeBox(true);
        setSubmitMessage("OTP sent successfully"); // Update the message to "OTP sent successfully" in the set
      }
    } catch (error) {
      console.log("Error message", error);
      setSubmitMessage(`${error?.response?.data?.message?.message}`);
    } finally {
      dispatch(setLoading(false));
      // setShowCodeBox(true);
    }
  };

  const checkVerificationCode = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post("/user/verifyNumber", {
        mobileNumber: `${userData.fatherContactNumber}`,
        otp: code,
      });
      console.log("response from checkVerificationCode", response);
      if (response.status === 200) {
        // setSubmitMessage("fatherContactNumber number verified successfully!");
        setCodeVerified(true);
        // setShowCodeBox(false);
        return true;
      }
      // setCodeVerified(true);
      // setShowCodeBox(false);
      // return true;
    } catch (error) {
      console.log("Error message for checkVerificationCode", error);
      setSubmitMessage("Invalid OTP. Please try again.");
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmittingForm(true); // ⬅️ Only show LoadingPage now

      let codeChecked = await checkVerificationCode();
      // let codeChecked = true;
      if (codeChecked === false) {
        // setShowCodeBox(false);
        setCodeVerified(false);
        // setSubmitMessage("Please Verify Your Phone Number");
        setIsSubmittingForm(false); // ⬅️ reset if verification fails
        return;
      }

      if (validateForm()) {
        await dispatch(submitFormData(userData));
        navigate("/firstPage");

        // if (document.cookie !== "") {
        //   setShowLoadingPage(true); // Show your full-screen LoadingPage

        //   setTimeout(() => {

        //     setShowLoadingPage(false);
        //   }, 3000);
        // }

        console.log("userData for onSubmit", userData);
      }
    } catch (error) {
      console.log("error from onSubmit", error);
      setIsSubmittingForm(false); // ⬅️ always reset this
    }
  };


  

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



  return (
    <div className="relative py-4 sm:py-6 md:py-8 w-full min-h-screen bg-gray-50">

      <div className="max-w-3xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
              Phone Verification
            </h2>
            <div className="text-xs sm:text-sm text-gray-600">
              Getting Started
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-[#c61d23] to-[#a01818] h-2 rounded-full transition-all duration-300"
              style={{ width: showCodeBox ? "50%" : "10%" }}
            ></div>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:gap-5">
          <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-4 sm:p-5 md:p-6">
            <label
              htmlFor="fatherContactNumber"
              className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3"
            >
              <Phone
                size={16}
                className="text-[#c61d23] sm:w-[18px] sm:h-[18px]"
              />
              <span className="flex-1">Contact Number (Parent)</span>
              <span className="text-[#c61d23]">*</span>
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <input
                  type="number"
                  id="fatherContactNumber"
                  name="fatherContactNumber"
                  value={userData?.fatherContactNumber || ""}
                  onChange={handleChange}
                  placeholder="Enter 10-digit mobile number"
                  disabled={showCodeBox && codeVerified}
                  className="w-full text-sm sm:text-base border border-gray-200 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-[#c61d23] focus:border-transparent focus:outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm sm:text-base">
                  +91
                </div>
              </div>
              {!showCodeBox && !codeVerified && (
                <button
                  type="button"
                  onClick={verifyPhoneNo}
                  disabled={loading}
                  className="px-4 sm:px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 whitespace-nowrap"
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              )}
            </div>
            {errors.fatherContactNumber && (
              <div className="flex items-center gap-2 text-red-500 text-xs mt-2">
                <AlertCircle size={14} />
                {errors.fatherContactNumber}
              </div>
            )}
            
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2">
              <Shield size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-blue-700">
                We'll use this number to keep you updated about your enquiry.
              </p>
            </div>
          </div>

          {showCodeBox && (
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-4 sm:p-5 md:p-6">
              <label
                htmlFor="otp"
                className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3"
              >
                <Shield
                  size={16}
                  className="text-[#c61d23] sm:w-[18px] sm:h-[18px]"
                />
                <span className="flex-1">Verification Code</span>
                <span className="text-[#c61d23]">*</span>
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={code}
                onChange={handleOTPChange}
                placeholder="Enter 4-digit OTP"
                maxLength={4}
                disabled={codeVerified}
                className="w-full text-sm sm:text-base border border-gray-200 rounded-lg p-2.5 sm:p-3 focus:ring-2 focus:ring-[#c61d23] focus:border-transparent focus:outline-none transition-all text-center tracking-widest font-bold disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              {codeVerified && (
                <div className="flex items-center gap-2 text-green-600 text-xs mt-2">
                  <CheckCircle size={14} />
                  OTP verified successfully!
                </div>
              )}
            </div>
          )}

          {submitMessage && (
            <div className={`${submitMessage.includes("successfully") ? "bg-green-50 border-green-200" : "bg-yellow-50 border-yellow-200"} border rounded-xl p-3 sm:p-4 flex items-start gap-2 sm:gap-3`}>
              <AlertCircle
                size={16}
                className={`${submitMessage.includes("successfully") ? "text-green-600" : "text-yellow-600"} flex-shrink-0 mt-0.5 sm:w-[18px] sm:h-[18px]`}
              />
              <p className={`text-xs sm:text-sm ${submitMessage.includes("successfully") ? "text-green-700" : "text-yellow-700"}`}>
                {submitMessage}
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 sm:p-4 flex items-start gap-2 sm:gap-3">
              <AlertCircle
                size={16}
                className="text-red-500 flex-shrink-0 mt-0.5 sm:w-[18px] sm:h-[18px]"
              />
              <p className="text-xs sm:text-sm text-red-700">{error}</p>
            </div>
          )}

          {!isSubmittingForm && loading && showCodeBox && (
            <div className="flex justify-center items-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#c61d23] border-t-transparent"></div>
            </div>
          )}

          {showCodeBox && (
            <div className="flex gap-3 mt-4 sm:mt-6 md:mt-8">
              <button
                onClick={onSubmit}
                disabled={loading || isSubmittingForm || !code || code.length !== 4}
                className="w-full flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#c61d23] to-[#a01818] hover:from-[#b01820] hover:to-[#8f1515] text-white text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              >
                <span>{loading || isSubmittingForm ? "Verifying..." : "Verify & Continue"}</span>
                {!loading && !isSubmittingForm && <ArrowRight size={18} />}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupForm;







