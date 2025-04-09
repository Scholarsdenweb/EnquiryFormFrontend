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

  const [code, setCode] = useState("");
  const [showCodeBox, setShowCodeBox] = useState(false);
  const { userData, dataExist, error } = useSelector(
    (state) => state.userDetails
  );

  const { loading } = useSelector((state) => state.loadingDetails);

  const [submitMessage, setSubmitMessage] = useState("");

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
    [ "fatherContactNumber"].forEach((field) => {
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
      setSubmitMessage(`${error.response.data.message.message}`);
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


      console.log("loading", loading )
      // dispatch(setLoading(true));
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
          setShowLoadingPage(true);

          

          setTimeout(() => {
            navigate("/firstPage");
            setShowLoadingPage(false);
            

          },[3000])



          
        }

        console.log("userData for onSubmit", userData);
        console.log("dataExist for onSubmit", dataExist);
      }
    } catch (error) {
      console.log("error from onSubmit", error);
    }
    
  
  };

 return (
    <div className="w-full">
      {showLoadingPage && (
        <LoadingPage />
      ) 
    }

    {loading && (
      <Spinner/>

    )}
        <form
          className="flex flex-col justify-center px-12 items-center gap-2 py-8 text-white"
          onSubmit={onSubmit}
        >
          {/* <div className="flex flex-col justify-center items-center">
            <h2 className="text-4xl text-white ">Enquiry Form</h2>
          </div> */}

          {/* Name Field */}
          <div className="flex flex-col justify-center items-center w-full gap-4">
   
   
          

          {/* Phone Field */}
          <div className="flex gap-3 flex-col w-2/3">
            <div className="flex-1 flex justify-center items-center w-full">
              <input
                autoComplete="off"
                type="number"
                id="phone"
                name="fatherContactNumber"
                value={userData?.fatherContactNumber || ""}
                onChange={handleChange}
                placeholder="*Contact no (Parents)"
                className="w-full bg-[#c61d23] border-b-2 border-white placeholder-white focus:outline-none p-2"
              />
              {!showCodeBox && !codeVerified && (
                <div className="flex">
                  <button
                    type="button"
                    onClick={verifyPhoneNo}
                    className="px-4 py-2 border-2 text-white  hover:bg-[#ffdd00] hover:text-black rounded-full"
                  
                  >
                    Send OTP
                  </button>
                </div>
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