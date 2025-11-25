// import { useEffect, useState } from "react";
// import axios from "../../api/axios";
// import { useNavigate, Link } from "react-router-dom";
// import scholarsDenLogo from "../assets/scholarsDenLogo.png";

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


































import { useState } from "react";
import { User, Users, Mail, AlertCircle, ArrowRight } from "lucide-react";

const FirstPageContant = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    fatherName: "",
    email: ""
  });

  const [submitMessage, setSubmitMessage] = useState("");
  const [errors, setErrors] = useState({
    studentName: "",
    fatherName: "",
    email: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (value.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const validateForm = () => {
    const formErrors = {};
    let isValid = true;

    if (!formData.studentName?.trim()) {
      formErrors.studentName = "Student Name is required";
      isValid = false;
    }

    if (!formData.fatherName?.trim()) {
      formErrors.fatherName = "Father's Name is required";
      isValid = false;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      formErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitMessage("");
      setLoading(true);

      if (validateForm()) {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSubmitMessage("Form submitted successfully!");
        console.log("Form Data:", formData);
      }
    } catch (error) {
      console.log("error from onSubmit", error);
      setSubmitMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#fdf5f6] via-white to-[#f5eff0]">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-[#c61d23] to-[#a01818]">
                <User size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#c61d23] to-[#a01818]">
                  Enquiry Form
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">
                  Start your journey with us
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Decorative Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#ffdd00]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#c61d23]/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative py-8 sm:py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Card */}
          <div className="mb-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-2xl sm:text-3xl font-light text-gray-900 mb-2">
              <strong className="font-semibold text-[#c61d23]">Welcome to</strong>{" "}
              Scholars Den
            </h3>
            <p className="text-gray-600 mb-3">Please fill your Enquiry Form</p>
            <div className="flex items-center gap-2 text-sm font-semibold text-[#c61d23]">
              <span>TRUST</span>
              <span className="text-gray-300">•</span>
              <span>CARE</span>
              <span className="text-gray-300">•</span>
              <span>HONESTY</span>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-900">
                Getting Started
              </h2>
              <div className="text-sm text-gray-600">Basic Information</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-[#c61d23] to-[#a01818] h-2 rounded-full transition-all"
                style={{ width: "10%" }}
              ></div>
            </div>
          </div>

          {/* Form Container */}
          <div className="flex flex-col gap-5">
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
                value={formData.studentName}
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
                value={formData.fatherName}
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

            {/* Email (Optional) */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-6">
              <label
                htmlFor="email"
                className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3"
              >
                <Mail size={18} className="text-[#c61d23]" />
                Email Address
                <span className="text-xs text-gray-500 font-normal">(Optional)</span>
              </label>
              <input
                autoComplete="off"
                type="email"
                id="email"
                name="email"
                value={formData.email}
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

            {/* Success/Error Message */}
            {submitMessage && (
              <div className={`${submitMessage.includes('success') ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border rounded-xl p-4 flex items-start gap-3`}>
                <AlertCircle
                  size={18}
                  className={`${submitMessage.includes('success') ? 'text-green-500' : 'text-red-500'} flex-shrink-0 mt-0.5`}
                />
                <p className={`text-sm ${submitMessage.includes('success') ? 'text-green-700' : 'text-red-700'}`}>
                  {submitMessage}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={onSubmit}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#c61d23] to-[#a01818] hover:from-[#b01820] hover:to-[#8f1515] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{loading ? "Processing..." : "Next"}</span>
                {!loading && <ArrowRight size={20} />}
              </button>
            </div>
          </div>

          {/* Footer Logo */}
          <div className="flex justify-center items-center mt-12 pt-8 border-t border-gray-100">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#c61d23] to-[#a01818] flex items-center justify-center text-white font-bold text-lg shadow-lg">
              SD
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstPageContant;