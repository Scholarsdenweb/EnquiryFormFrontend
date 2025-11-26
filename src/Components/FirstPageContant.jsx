// import { useEffect, useState } from "react";
// import axios from "../../api/axios";
// import { useNavigate, Link } from "react-router-dom";
// import scholarsDenLogo from "../assets/scholarsDenLogo.png";

// import { ArrowRight, Mail, User, Users } from "lucide-react";

// import {
//   fetchUserDetails,
//   putFormData,

//   updateUserDetails,
// } from "../../redux/formDataSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { setLoading } from "../../redux/loadingSlice";
// import Spinner from "./Spinner";
// import FormHeader from "./FormHeader";

// const FirstPageContant = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [code, setCode] = useState("");
//   const [showCodeBox, setShowCodeBox] = useState(false);
//   const { userData, dataExist, error } = useSelector(
//     (state) => state.userDetails
//   );

//   const { loading } = useSelector((state) => state.loadingDetails);

//   const [submitMessage, setSubmitMessage] = useState("");

//   const phoneRegex = /^\+91[0-9]{10}$/;
//   // const [codeVerified, setCodeVerified] = useState(true);

//   // State hooks
//   const [errors, setErrors] = useState({
//     studentName: "",
//     fatherName: ""
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     console.log("name", name, "value", value);
//     dispatch(updateUserDetails({ [name]: value }));

//     if (value.trim()) {
//       setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
//     }
//   };

// useEffect(() => {
//   console.log("userData from useEffect", userData);
// }, [userData]);

// useEffect(()=>{
//   dispatch(fetchUserDetails())
// },[])

//   const validateForm = () => {
//     const formErrors = {};
//     let isValid = true;

//     // Field validation
//     ["studentName", "fatherName"].forEach((field) => {
//       if (!userData[field]?.trim()) {
//         const formattedField = field
//           .replace(/([A-Z])/g, " $1")
//           .replace(/^./, (str) => str.toUpperCase());
//         formErrors[field] = `${formattedField} is required`;
//         isValid = false;
//       }
//     });

//     if (userData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
//       formErrors.email = "Email must be valid";
//       isValid = false;
//     }

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

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     try {
//     //   let codeChecked = await checkVerificationCode();

//     //   console.log("codeChecked", codeChecked);
//       dispatch(setLoading(true));
//       setSubmitMessage("");
//       console.log("Button Clicked");
//     //   if (codeChecked === false) {
//     //     setShowCodeBox(false);
//     //     setCodeVerified(false);
//     //     return setSubmitMessage("Please Verify Your Phone Number");

//     //   }

//       // if (validateForm() && codeChecked === true) {
//       if (validateForm() ) {
//         await dispatch(putFormData(userData));

//         if(document.cookie !== ""){
//           navigate("/enquiryform");
//         }

//         console.log("userData for onSubmit", userData);
//         console.log("dataExist for onSubmit", dataExist);
//       }
//     } catch (error) {
//       console.log("error from onSubmit", error);
//     } finally {
//       await dispatch(setLoading(false));
//     }
//   };

//   return (
//     <div className="min-h-screen w-full bg-[#c61d23] px-2 md:px-8 py-2 overflow-auto max-w-[768px]">
//     {loading && <Spinner />}

//     <div className="flex flex-col gap-6 max-w-screen-md mx-auto">
//       <div>
//         <FormHeader />
//       </div>

//       <h1 className="text-3xl md:text-4xl font-semibold text-white text-center">Enquiry Form</h1>

//       <form
//   autoComplete="off"
//   onSubmit={onSubmit}
//   className="flex flex-col gap-y-6 bg-[#c61d23] text-white w-5/6 justify-center items-center mx-auto"
// >
//   {/* Student Name */}
//   <div className="w-full">
//     <label htmlFor="studentName" className="block text-sm font-medium mb-1">
//       Student Name<span className="text-yellow-300">*</span>
//     </label>
//     <input
//       autoComplete="off"
//       type="text"
//       id="studentName"
//       name="studentName"
//       value={userData?.studentName || ""}
//       onChange={handleChange}
//       placeholder="*Student Name"
//       className="w-full bg-[#c61d23] border-b-2 border-white placeholder-gray-400 focus:outline-none p-2"
//     />
//     {errors.studentName && (
//       <p className="text-sm text-yellow-300 mt-1">{errors.studentName}</p>
//     )}
//   </div>

//   {/* Parent Name */}
//   <div className="w-full">
//     <label htmlFor="fatherName" className="block text-sm font-medium mb-1">
//       Fathers Name<span className="text-yellow-300">*</span>
//     </label>
//     <input
//       autoComplete="off"
//       type="text"
//       id="fatherName"
//       name="fatherName"
//       value={userData?.fatherName || ""}
//       onChange={handleChange}
//       placeholder="*Parents Name"
//       className="w-full bg-[#c61d23] border-b-2 border-white placeholder-gray-400 focus:outline-none p-2"
//     />
//     {errors.fatherName && (
//       <p className="text-sm text-yellow-300 mt-1">{errors.fatherName}</p>
//     )}
//   </div>

//   {/* Email */}
//   <div className="w-full">
//     <label htmlFor="email" className="block text-sm font-medium mb-1">
//       Email ID
//     </label>
//     <input
//       autoComplete="off"
//       type="email"
//       id="email"
//       name="email"
//       value={userData?.email || ""}
//       onChange={handleChange}
//       placeholder="Email ID"
//       className="w-full bg-[#c61d23] border-b-2 border-white placeholder-gray-400 focus:outline-none p-2"
//     />
//     {errors.email && (
//       <p className="text-sm text-yellow-300 mt-1">{errors.email}</p>
//     )}
//   </div>

//   {submitMessage && (
//     <p className="text-sm text-yellow-300 text-center">{submitMessage}</p>
//   )}
//   {error && <p className="text-sm text-red-400 text-center">{error}</p>}

//   <div className="w-full flex justify-end items-end">
//     <button
//       type="submit"
//       className="w-full md:w-1/3 py-2 border-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-xl transition-all"
//     >
//       Next
//     </button>
//   </div>
// </form>

//  {/* SUBMIT MESSAGE */}
//       {submitMessage && (
//         <div className="w-full text-center">
//           <p className={`text-sm ${submitMessage === "successfully" ? "text-green-400" : "text-red-400"}`}>
//             {submitMessage}
//           </p>
//         </div>
//       )}

//       {/* LOGO */}
//       <div className="flex justify-center items-center py-4">
//       <img className="w-24" src={scholarsDenLogo} alt="Scholars Den Logo" />
//     </div>
//   </div>
//   </div>
//   );
// };

// export default FirstPageContant;

import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";
import scholarsDenLogo from "../assets/scholarsDenLogo.png";
import { ArrowRight, Mail, User, Users, AlertCircle } from "lucide-react";
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

  // State hooks
  const [errors, setErrors] = useState({
    studentName: "",
    fatherName: "",
    email: "",
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

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, []);

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

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      setSubmitMessage("");
      console.log("Button Clicked");

      if (validateForm()) {
        const dataFromPutFormData = await dispatch(putFormData(userData));

        console.log("dataFromPutFormData", dataFromPutFormData.type);

        if (dataFromPutFormData.type == "userDetails/putFormData/fulfilled") {
          console.log("Navigate to enquiryForm");
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
    <div className="relative py-8 sm:py-12">
      {loading && <Spinner />}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">
              Initial Registration
            </h2>
            <div className="text-sm text-gray-600">Student Information</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-[#c61d23] to-[#a01818] h-2 rounded-full"
              style={{ width: "33%" }}
            ></div>
          </div>
        </div>

        {/* Form Container */}
        <form
          autoComplete="off"
          onSubmit={onSubmit}
          className="flex flex-col gap-5"
        >
          {/* Student Name */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-6">
            <label
              htmlFor="studentName"
              className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3"
            >
              <User size={18} className="text-[#c61d23]" />
              Student Name
              <span className="text-[#c61d23]">*</span>
            </label>
            <input
              autoComplete="off"
              type="text"
              id="studentName"
              name="studentName"
              value={userData?.studentName || ""}
              onChange={handleChange}
              placeholder="Enter student's full name"
              className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-[#c61d23] focus:border-transparent focus:outline-none transition-all"
            />
            {errors.studentName && (
              <div className="flex items-center gap-2 text-red-500 text-xs mt-2">
                <AlertCircle size={14} />
                {errors.studentName}
              </div>
            )}
          </div>

          {/* Father's Name */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-6">
            <label
              htmlFor="fatherName"
              className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3"
            >
              <Users size={18} className="text-[#c61d23]" />
              Father's Name
              <span className="text-[#c61d23]">*</span>
            </label>
            <input
              autoComplete="off"
              type="text"
              id="fatherName"
              name="fatherName"
              value={userData?.fatherName || ""}
              onChange={handleChange}
              placeholder="Enter father's full name"
              className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-[#c61d23] focus:border-transparent focus:outline-none transition-all"
            />
            {errors.fatherName && (
              <div className="flex items-center gap-2 text-red-500 text-xs mt-2">
                <AlertCircle size={14} />
                {errors.fatherName}
              </div>
            )}
          </div>

          {/* Email */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-6">
            <label
              htmlFor="email"
              className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3"
            >
              <Mail size={18} className="text-[#c61d23]" />
              Email Address
              <span className="text-xs text-gray-500 font-normal">
                (Optional)
              </span>
            </label>
            <input
              autoComplete="off"
              type="email"
              id="email"
              name="email"
              value={userData?.email || ""}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-[#c61d23] focus:border-transparent focus:outline-none transition-all"
            />
            {errors.email && (
              <div className="flex items-center gap-2 text-red-500 text-xs mt-2">
                <AlertCircle size={14} />
                {errors.email}
              </div>
            )}
          </div>

          {/* Error Messages */}
          {submitMessage && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle
                size={18}
                className="text-red-500 flex-shrink-0 mt-0.5"
              />
              <p className="text-sm text-red-700">{submitMessage}</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle
                size={18}
                className="text-red-500 flex-shrink-0 mt-0.5"
              />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-3 mt-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#c61d23] to-[#a01818] hover:from-[#b01820] hover:to-[#8f1515] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{loading ? "Submitting..." : "Next"}</span>
              {!loading && <ArrowRight size={18} />}
            </button>
          </div>
        </form>

        {/* Logo */}
        {/* <div className="flex justify-center items-center py-8 mt-8">
          <img
            className="w-24 opacity-60 hover:opacity-100 transition-opacity"
            src={scholarsDenLogo}
            alt="Scholars Den Logo"
          />
        </div> */}
      </div>
    </div>
  );
};

export default FirstPageContant;
