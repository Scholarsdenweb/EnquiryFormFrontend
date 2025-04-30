import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";
import scholarsDenLogo from "../assets/scholarsDenLogo.png";

import {
  fetchUserDetails,
  putFormData,

  updateUserDetails,
} from "../../redux/formDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/loadingSlice";
import Spinner from "./Spinner";
import FormHeader from "./FormHeader";

const FirstPageContant = () => {
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


  // State hooks
  const [errors, setErrors] = useState({
    studentName: "",
    fatherName: ""
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



useEffect(()=>{
  dispatch(fetchUserDetails())
},[])

  const validateForm = () => {
    const formErrors = {};
    let isValid = true;

    // Field validation
    ["studentName", "fatherName"].forEach((field) => {
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



  const onSubmit = async (e) => {
    e.preventDefault();
    try {
    //   let codeChecked = await checkVerificationCode();

    //   console.log("codeChecked", codeChecked);
      dispatch(setLoading(true));
      setSubmitMessage("");
      console.log("Button Clicked");
    //   if (codeChecked === false) {
    //     setShowCodeBox(false);
    //     setCodeVerified(false);
    //     return setSubmitMessage("Please Verify Your Phone Number");

    //   }

      // if (validateForm() && codeChecked === true) {
      if (validateForm() ) {
        await dispatch(putFormData(userData));

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
    <div className="min-h-screen w-full bg-[#c61d23] px-2 md:px-8 py-2 overflow-auto max-w-[768px]">
    {loading && <Spinner />}
    
    <div className="flex flex-col gap-6 max-w-screen-md mx-auto">
      <div>
        <FormHeader />
      </div>
  
      <h1 className="text-3xl md:text-4xl font-semibold text-white text-center">Enquiry Form</h1>
  
      <form
  autoComplete="off"
  onSubmit={onSubmit}
  className="flex flex-col gap-y-6 bg-[#c61d23] text-white w-5/6 justify-center items-center mx-auto"
>
  {/* Student Name */}
  <div className="w-full">
    <label htmlFor="studentName" className="block text-sm font-medium mb-1">
      Student Name<span className="text-yellow-300">*</span>
    </label>
    <input
      autoComplete="off"
      type="text"
      id="studentName"
      name="studentName"
      value={userData?.studentName || ""}
      onChange={handleChange}
      placeholder="*Student Name"
      className="w-full bg-[#c61d23] border-b-2 border-white placeholder-gray-400 focus:outline-none p-2"
    />
    {errors.studentName && (
      <p className="text-sm text-yellow-300 mt-1">{errors.studentName}</p>
    )}
  </div>

  {/* Parent Name */}
  <div className="w-full">
    <label htmlFor="fatherName" className="block text-sm font-medium mb-1">
      Fathers Name<span className="text-yellow-300">*</span>
    </label>
    <input
      autoComplete="off"
      type="text"
      id="fatherName"
      name="fatherName"
      value={userData?.fatherName || ""}
      onChange={handleChange}
      placeholder="*Parents Name"
      className="w-full bg-[#c61d23] border-b-2 border-white placeholder-gray-400 focus:outline-none p-2"
    />
    {errors.fatherName && (
      <p className="text-sm text-yellow-300 mt-1">{errors.fatherName}</p>
    )}
  </div>

  {/* Email */}
  <div className="w-full">
    <label htmlFor="email" className="block text-sm font-medium mb-1">
      Email ID
    </label>
    <input
      autoComplete="off"
      type="email"
      id="email"
      name="email"
      value={userData?.email || ""}
      onChange={handleChange}
      placeholder="Email ID"
      className="w-full bg-[#c61d23] border-b-2 border-white placeholder-gray-400 focus:outline-none p-2"
    />
    {errors.email && (
      <p className="text-sm text-yellow-300 mt-1">{errors.email}</p>
    )}
  </div>

  {submitMessage && (
    <p className="text-sm text-yellow-300 text-center">{submitMessage}</p>
  )}
  {error && <p className="text-sm text-red-400 text-center">{error}</p>}

  <div className="w-full flex justify-end items-end">
    <button
      type="submit"
      className="w-full md:w-1/3 py-2 border-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-xl transition-all"
    >
      Next
    </button>
  </div>
</form>


 {/* SUBMIT MESSAGE */}
      {submitMessage && (
        <div className="w-full text-center">
          <p className={`text-sm ${submitMessage === "successfully" ? "text-green-400" : "text-red-400"}`}>
            {submitMessage}
          </p>
        </div>
      )}
  
      {/* LOGO */}
      <div className="flex justify-center items-center py-4">
      <img className="w-24" src={scholarsDenLogo} alt="Scholars Den Logo" />
    </div>
  </div>
  </div>
  );
};

export default FirstPageContant;