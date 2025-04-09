import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";
import {
  fetchUserDetails,
  submitFormData,
  updateUserDetails,
} from "../../redux/formDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/loadingSlice";
import Spinner from "./Spinner";
// import ScholarsDenLogo from "../assets/scholarsDenLogo.png";

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [code, setCode] = useState("");
  const [showCodeBox, setShowCodeBox] = useState(false);
  const { userData, dataExist, error } = useSelector(
    (state) => state.userDetails
  );

  const { loading } = useSelector((state) => state.loadingDetails);

  const [submitMessage, setSubmitMessage] = useState("");

  const phoneRegex = /^\+91[0-9]{10}$/;
  // const [codeVerified, setCodeVerified] = useState(true);
  const [codeVerified, setCodeVerified] = useState(false);

  // State hooks
  const [errors, setErrors] = useState({
    studentName: "",
    fatherContactNumber: "",
    fatherName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name", name, "value", value);
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
    ["studentName", "fatherContactNumber", "fatherName"].forEach((field) => {
      if (!userData[field]?.trim()) {
        const formattedField = field
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase());
        formErrors[field] = `${formattedField} is required`;
        isValid = false;
      }
    });

    if (userData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      formErrors.email = "Email must be valid";
      isValid = false;
    }

    if (!phoneRegex.test(`+91${userData.fatherContactNumber}`)) {
      formErrors.fatherContactNumber = "fatherContactNumber must be a valid 10-digit number";
      isValid = false;
    }

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
      setSubmitMessage(`${error.response.data.message}`);
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
        setSubmitMessage("fatherContactNumber number verified successfully!");
        setCodeVerified(true);
        setShowCodeBox(false);
        return true;
      }
      // setCodeVerified(true);
      // setShowCodeBox(false);
      // return true;
    } catch (error) {
      console.log("Error messagefor checkVerificationCode", error);
      setSubmitMessage("Error verifying fatherContactNumber number");
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let codeChecked = await checkVerificationCode();

      console.log("codeChecked", codeChecked);
      dispatch(setLoading(true));
      setSubmitMessage("");
      console.log("Button Clicked");
      if (codeChecked === false) {
        setShowCodeBox(false);
        setCodeVerified(false);
        return setSubmitMessage("Please Verify Your Phone Number");

      }

      // if (validateForm() && codeChecked === true) {
      if (validateForm() ) {
        await dispatch(submitFormData(userData));

        if(document.cookie !== ""){
          navigate("/enquiryform");
        }

        console.log("userData for onSubmit", userData);
        console.log("dataExist for onSubmit", dataExist);
      }
    } catch (error) {
      console.log("error from onSubmit", error);
    } finally {
      await dispatch(setLoading(false));
    }
  };

 return (
    <div className="w-full">
      {loading && <Spinner />}
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center gap-4 px-4 md:px-12 py-6 text-white"
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-2">
          Enquiry Form
        </h2>

        {/* Input Fields */}
        <div className="w-full md:w-2/3 flex flex-col gap-4">
          {/* Student Name */}
          <div>
            <input
              type="text"
              name="studentName"
              value={userData?.studentName || ""}
              onChange={handleChange}
              placeholder="*Student Name"
              className="w-full bg-[#c61d23] border-b-2 border-white placeholder-white focus:outline-none p-2"
            />
            {errors.studentName && (
              <p className="text-sm text-yellow-300 mt-1">{errors.studentName}</p>
            )}
          </div>

          {/* Parent Name */}
          <div>
            <input
              type="text"
              name="fatherName"
              value={userData?.fatherName || ""}
              onChange={handleChange}
              placeholder="*Parents Name"
              className="w-full bg-[#c61d23] border-b-2 border-white placeholder-white focus:outline-none p-2"
            />
            {errors.fatherName && (
              <p className="text-sm text-yellow-300 mt-1">{errors.fatherName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              value={userData?.email || ""}
              onChange={handleChange}
              placeholder="Email ID"
              className="w-full bg-[#c61d23] border-b-2 border-white placeholder-white focus:outline-none p-2"
            />
            {errors.email && (
              <p className="text-sm text-yellow-300 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Contact Number & OTP */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-2">
              <input
                type="tel"
                name="fatherContactNumber"
                value={userData?.fatherContactNumber || ""}
                onChange={handleChange}
                placeholder="*Contact no (Parents)"
                className="w-full bg-[#c61d23] border-b-2 border-white placeholder-white focus:outline-none p-2"
              />
              {!showCodeBox && !codeVerified && (
                <button
                  type="button"
                  onClick={verifyPhoneNo}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-1 rounded-xl"
                >
                  Send OTP
                </button>
              )}
            </div>
            {errors.fatherContactNumber && (
              <p className="text-sm text-yellow-300">{errors.fatherContactNumber}</p>
            )}
          </div>

          {/* Verification Code */}
          {showCodeBox && (
            <div className="flex flex-col">
              <input
                type="text"
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="*Verification Code"
                className="w-full bg-[#c61d23] border-b-2 border-white placeholder-white focus:outline-none p-2"
              />
            </div>
          )}

          {/* Submit Message */}
          {submitMessage && (
            <p className="text-sm text-center text-yellow-300">{submitMessage}</p>
          )}
          {error && (
            <p className="text-sm text-center text-red-300">{error}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-2/3 md:w-1/3 bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded-xl mt-4 transition-all"
        >
          Next
        </button>

       
      </form>
    </div>
  );
};

export default SignupForm;