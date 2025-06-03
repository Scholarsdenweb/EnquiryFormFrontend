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

// import ScholarsDenLogo from "../assets/scholarsDenLogo.png";

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
    <div className=" w-full bg-[#c61d23] flex items-center justify-center px-4 py-1">
      {isSubmittingForm && showLoadingPage && <LoadingPage />}

      <form
        onSubmit={onSubmit}
        className="bg-white/10 backdrop-blur-md shadow-lg p-6 rounded-xl w-full max-w-lg space-y-6 text-white"
      >
        <h2 className="text-center text-2xl md:text-3xl font-semibold">
          Phone Number Verification
        </h2>

        <div className="space-y-4">
          <label
            htmlFor="fatherContactNumber"
            className="block text-sm font-medium"
          >
            *Contact Number (Parent)
          </label>
          <div className="flex flex-col md:flex-row gap-2">
            <input
              type="number"
              id="fatherContactNumber"
              name="fatherContactNumber"
              value={userData?.fatherContactNumber || ""}
              onChange={handleChange}
              placeholder="Enter Contact Number"
              className="flex-1 bg-white/10 text-white border border-white px-4 py-2 focus:outline-none placeholder-gray-400"
            />
            {!showCodeBox && !codeVerified && (
              <button
                type="button"
                onClick={verifyPhoneNo}
                className="px-4 py-2 rounded-md bg-yellow-500 hover:bg-yellow-600 text-black font-semibold "
              >
                Send OTP
              </button>
            )}
          </div>
          {errors.fatherContactNumber && (
            <p className="text-sm text-yellow-300">
              {errors.fatherContactNumber}
            </p>
          )}
        </div>

        {/* OTP Input */}
        {showCodeBox && (
          <div className="space-y-2">
            <label htmlFor="otp" className="block text-sm font-medium">
              *Verification Code
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={code}
              onChange={handleOTPChange}
              placeholder="Enter OTP"
              className="w-full bg-white/20 text-white border border-white px-4 py-2 focus:outline-none placeholder-gray-400"
            />
          </div>
        )}

        {/* Message */}
        {submitMessage && (
          <p className="text-sm text-center text-yellow-300">{submitMessage}</p>
        )}
        {error && <p className="text-sm text-center text-red-300">{error}</p>}

        {!isSubmittingForm && loading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin  rounded-full h-5 w-5 border-b-2 border-white"></div>
          </div>
        )}

        {/* Submit */}



        {showCodeBox && (
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded-xl transition-all disabled:bg-yellow-800"
            disabled={!codeEntered}
          >
            Next
          </button>
         )} 
      </form>
    </div>
  );
};

export default SignupForm;
