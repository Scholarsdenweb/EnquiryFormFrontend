// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import Neeche from "../assets/Neeche.png";

// import {
//   fetchUserDetails,
//   putFormData,
//   updateUserDetails,
// } from "../../redux/formDataSlice";
// import { setLoading } from "../../redux/loadingSlice";
// import scholarsDenLogo from "../assets/scholarsDenLogo.png";
// import Spinner from "./Spinner";
// import FormHeader from "./FormHeader";
// import axios from "../../api/axios";

// // Reusable Input Component
// const InputField = ({
//   label,
//   name,
//   value,
//   onChange,
//   error,
//   type = "text",
//   placeholder,
// }) => (
//   <div className="flex flex-col">
//     {/* <label htmlFor={name} className="text-lg font-semibold mb-1">
//       {label}
//     </label> */}
//     <input
//       autoComplete="off"
//       type={type}
//       name={name}
//       value={value || ""}
//       onChange={onChange}
//       placeholder={placeholder}
//       className="border-b-2 border-white text-white py-2 bg-[#c61d23] focus:outline-none placeholder-white  appearance-none"
//     />
//     {error && <span className="text-white text-sm mt-1">{error}</span>}
//   </div>
// );

// // Reusable Select Component
// const SelectField = ({ label, name, value, options, onChange, error }) => (
//   <div className="flex flex-col">
//     {/* <label htmlFor={name} className="text-lg font-semibold mb-1">
//       {label}
//     </label> */}
//     <select
//       name={name}
//       value={value || ""}
//       onChange={onChange}
//       className="border-b-2 text-white py-2 bg-[#c61d23] focus:outline-none  appearance-none "
//       style={{
//         backgroundImage: `url(${Neeche})`,

//         backgroundRepeat: "no-repeat",
//         backgroundPosition: "right 10px center",
//         backgroundSize: "16px",
//       }}
//     >
//       <option value="" className="bg-white " disabled>
//         {label}
//       </option>
//       {options.map((option) => (
//         <option
//           className="bg-white text-black border-2 border-black-2"
//           key={option}
//           value={option}
//         >
//           {option}
//         </option>
//       ))}
//     </select>
//     {error && <span className="text-white text-sm mt-1">{error}</span>}
//   </div>
// );

// const TakenBy = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const options = [
//     "Times of India",
//     "Amar Ujala",
//     "Danik Jagran",
//     "Hindustan",
//     "Hoarding/Banner",
//     "Friend",
//     "Internet",
//     "Other(Please Specify)",
//   ];

//   const enquiryTakenBy = [
//     { label: "Adi Ma'am", value: "adi@scholarsden.in" },
//     { label: "Urooj Ma'am", value: "urooj@scholarsden.in" },
//     { label: "Diya Ma'am", value: "diya@scholarsden.in" },
//     { label: "Priya Ma'am", value: "priya@scholarsden.in" },
//     { label: "Yasir Sir", value: "yasir@scholarsden.in" },
//   ];

//   // const enquiryTakenBy = [
//   //   "sonali@scholarsden.in",
//   //   "urooj@scholarsden.in",
//   //   "diya@scholarsden.in",
//   //   "priya@scholarsden.in",
//   //   "admission@scholarsden.in",
//   // ];

//   const rendomNumber = Math.floor(Math.random() * 4);

//   useEffect(() => {
//     console.log("rendomNumber", rendomNumber);
//     dispatch(
//       updateUserDetails({ enquiryTakenBy: enquiryTakenBy[rendomNumber] })
//     );
//   }, []);

//   const { loading } = useSelector((state) => state.loadingDetails);

//   const { userData, dataExist } = useSelector((state) => state.userDetails);

//   const [errors, setErrors] = useState({});
//   const [showOtherInput, setShowOtherInput] = useState(false);
//   const [submitMessage, setSubmitMessage] = useState("");

//   useEffect(() => {
//     dispatch(fetchUserDetails());
//     console.log("userData from useEffect", userData);
//   }, [dispatch]);

//   useEffect(() => {
//     dispatch(fetchUserDetails());
//     console.log("userData from useEffect", userData);
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "enquiryTakenBy") {
//       dispatch(updateUserDetails({ [name]: value }));
//     }
//     dispatch(updateUserDetails({ [name]: value }));

//     if (name === "howToKnow") {
//       setShowOtherInput(value === "Other(Please Specify)");
//     }

//     if (value.trim()) {
//       setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
//     }
//   };

//   const validateForm = () => {
//     const formErrors = {};
//     let isValid = true;

//     [
//       // "howToKnow",
//       // "remarks",
//       // "intime",
//       "enquiryTakenBy",
//       // "brochureGiven",
//     ].forEach((field) => {
//       if (!userData[field]?.trim()) {
//         const formattedField = field
//           .replace(/([A-Z])/g, " $1")
//           .replace(/^./, (str) => str.toUpperCase());
//         formErrors[field] = `${formattedField} is required`;
//         isValid = false;
//       }
//     });

//     if (
//       userData.howToKnow === "Other(Please Specify)" &&
//       !userData.otherSource?.trim()
//     ) {
//       formErrors.otherSource = "Please specify how you came to know about us.";
//       isValid = false;
//     }

//     setErrors(formErrors);
//     return isValid;
//   };

//   // const putDataOnExtraEdge = async () => {
//   //   console.log("userData from putDataOnExtraEdge", userData);

//   //   const url = "https://thirdpartyapi.extraaedge.com/api/SaveRequest";

//   //   const headers = {
//   //     "Content-Type": "application/json",
//   //   };

//   //   // const apiData = { Source: "scholarsden", AuthToken: "SCHOLARSDEN-30-03-2024", FirstName : userData.studente };

//   //   const apiData = {
//   //     Source: "scholarsden",
//   //     AuthToken: "SCHOLARSDEN-30-03-2024",
//   //     FirstName: userData.studentName || "",
//   //     Email: userData.email || "",
//   //     Center: userData.courseOfIntrested || "",
//   //     Course: userData.program || "", // Assuming 'program' corresponds to 'Center'
//   //     State: userData.state || "", // No mapping in provided data, you may need to add this
//   //     City: userData.city || "",
//   //     Remarks: userData.remarks || "",
//   //     leadCampaign: "Walk-in",
//   //     LeadSource: "140",

//   //     Field4: userData.brochureGiven,
//   //     Field5: userData.howToKnow,
//   //     ReferredToEmail: userData.enquiryTakenBy,
//   //     Textb1: userData.intime,

//   //     Textb3: userData.schoolName,
//   //     Textb2: userData.fatherOccupations,
//   //     FathersName: userData.fatherName || "",

//   //     // imporovement Available
//   //     // MobileNumber: userData.studentContactNumber || "",
//   //     // FathersPhoneNumber: userData.fatherContactNumber || "",

//   //     MobileNumber: userData.fatherContactNumber || "",
//   //     FathersPhoneNumber: userData.studentContactNumber || "",

//   //     // Not added yet

//   //     // SchoolName: userData.schoolName || "",
//   //     // // EnquiryTakenBy: userData.enquiryTakenBy || "",
//   //     // // BrochureGiven: userData.brochureGiven || "",
//   //     // enquiryTakenBy: data?.enquiryTakenBy || "",
//   //     // fatherOccupations: userData.fatherOccupations || "",
//   //   };

//   //   console.log("apiData", apiData);

//   //   console.log("apiData from putDataOnExtraEdge", apiData);

//   //   try {
//   //     const response = await fetch(url, {
//   //       method: "POST",
//   //       headers: headers,
//   //       body: JSON.stringify(apiData),
//   //     });

//   //     console.log("Raw response:", response);

//   //     const contentType = response.headers.get("content-type");

//   //     if (!response.ok) {
//   //       throw new Error(`Request failed with status: ${response.status}`);
//   //     }

//   //     if (contentType && contentType.includes("application/json")) {
//   //       const responseData = await response.json();
//   //       console.log("Response Data:", responseData);
//   //     } else {
//   //       const textResponse = await response.text();
//   //       console.log("Non-JSON Response:", textResponse);
//   //     }
//   //   } catch (error) {
//   //     console.log("Error:", error);
//   //   }
//   // };

//   // const putDataOnZohoCrm = async () => {
//   //   try {
//   //     console.log("data from putDataOnZohoCrm", userData);
//   //     const url = "https://www.zohoapis.com/crm/v7/Leads";

//   //     console.log("Url from putDataOnZohoCrm", url);

//   //     const headers = {
//   //       "Content-Type": "application/json",
//   //       Authorization:
//   //         "Zoho-oauthtoken 1000.b5f11f322b7ab943d9d387d7ad1ae834.8d060d2cab9bcf5f35fc571141191fdc",
//   //     };

//   //     const apiData = {
//   //       FirstName: userData.studentName || "",
//   //       "Last_Name​": "test",
//   //       "Lead_Source​": "enquiry",
//   //       Last_Name: "Test",
//   //       Email: "testapi@ebc.com",
//   //       "Contact Number": userData.fatherContactNumber,
//   //       Lead_Status: userData.remarks,
//   //       TakenBy: userData.enquiryTakenBy,
//   //       testingField: "test",
//   //     };

//   //     const response = await fetch(url, {
//   //       method: "POST",
//   //       headers: headers,
//   //       body: JSON.stringify(apiData),
//   //     });

//   //     console.log("response from putDataOnZOhoCrm", response);
//   //   } catch (error) {
//   //     console.log("Error form onSubmit ", error);
//   //   }
//   // };

//   const putDataOnZohoCrm = async () => {
//     try {
//       console.log("userData from putDataOnZohoCrm", userData);

//       const api_data = {
//         Mobile: userData.fatherContactNumber,
//         Last_Name: userData?.studentName || "test",
//         FatherName: userData.fatherName,
//         FatherOccupations: userData.fatherOccupations,
//         Email: "te@gmail.com",
//         Lead_Status: "Fresh Lead",
//         Description: "Message",
//         TakenBy: "webdeveloper@scholarsden.in",
//         testingField: "test",
//         Lead_Source: "enquiry Form",
//       };

//       // const api_data = {
//       //   "Lead_Source​": "enquiry",
//       //   Last_Name: "Test",
//       //   Email: "testapi@ebc.com",
//       //   Mobile: "8876986310",
//       //   Company: "Google",
//       //   Industry: "NBFC",
//       //   Description: "Message",
//       //   TakenBy: "webdeveloper@scholarsden.in",
//       //   Products_Services: "Recharge",
//       //   testingField: "test",
//       // };

//       const response = await axios.post("/user/zoho/leads", {
//         data: [api_data],
//       });

//       const data = await response.json();
//       console.log("Zoho response:", data);
//     } catch (error) {
//       console.log("Error:", error);
//     }
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     dispatch(setLoading(true));
//     setSubmitMessage("");

//     if (validateForm()) {
//       await dispatch(putFormData(userData));

//       console.log("Testdata from the onSUBMIT", userData);

//       await putDataOnZohoCrm();

//       // document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
//       // navigate("/FormSubmitted");
//     }
//     dispatch(setLoading(false));
//   };

//   useEffect(() => {
//     console.log("userData from useEffect", userData);
//   }, [userData]);

//   return (
//     <div className="min-h-screen w-full overflow-auto px-4 md:px-8 py-2 bg-[#c61d23] max-w-[768px]">
//       {loading && <Spinner />}
//       <div className="flex flex-col gap-16 justify-between">
//         <div>
//           <FormHeader />

//           <div className="flex flex-col items-center mt-6">
//             <div className="w-full max-w-2xl">
//               <h1 className="text-3xl sm:text-4xl font-semibold text-white text-center mb-6">
//                 Enquiry Form
//               </h1>

//               <form
//                 autoComplete="off"
//                 className="flex flex-col gap-4 w-full"
//                 onSubmit={onSubmit}
//               >
//                 {/* How to Know */}
//                 {/* <SelectField
//                   label="How do you come to know about us?"
//                   name="howToKnow"
//                   value={userData?.howToKnow}
//                   options={options}
//                   onChange={handleChange}
//                   error={errors.howToKnow}
//                 /> */}

//                 <div className="flex flex-col flex-wrap">
//                   <label htmlFor="howToKnow" className="text-lg text-white ">
//                     How do you come to know about us?
//                   </label>

//                   <div className="flex flex-wrap gap-4 pl-4">
//                     <div className="flex items-center gap-1">
//                       <input
//                         type="radio"
//                         name="howToKnow"
//                         value={"News Paper"}
//                         checked={userData.howToKnow === "News Paper"}
//                         onChange={handleChange}
//                       />
//                       <label className="text-white text-lg ">News Paper</label>
//                     </div>
//                     <div className="flex items-center gap-1 ">
//                       <input
//                         type="radio"
//                         name="howToKnow"
//                         value="Hoarding/Banner"
//                         checked={userData.howToKnow === "Hoarding/Banner"}
//                         onChange={handleChange}
//                       />
//                       <label className="text-white text-lg ">
//                         Hoarding/Banner
//                       </label>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <input
//                         type="radio"
//                         name="howToKnow"
//                         value={"Reference"}
//                         onChange={handleChange}
//                         checked={userData.howToKnow === "Reference"}
//                       />
//                       <label className="text-white text-lg ">Reference</label>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <input
//                         type="radio"
//                         name="howToKnow"
//                         value="Internet"
//                         checked={userData.howToKnow === "Internet"}
//                         onChange={handleChange}
//                       />
//                       <label className="text-white text-lg ">Internet</label>
//                     </div>
//                   </div>
//                 </div>

//                 {showOtherInput && (
//                   <InputField
//                     label="Please Specify"
//                     name="otherSource"
//                     value={userData.otherSource}
//                     onChange={handleChange}
//                     placeholder="Other(Please Specify)"
//                     error={errors.otherSource}
//                   />
//                 )}

//                 {/* Enquiry Taken By */}
//                 {/* <SelectField
//                   label="Enquiry Taken By"
//                   name="enquiryTakenBy"
//                   value={userData.enquiryTakenBy}
//                   options={enquiryTakenBy}
//                   onChange={handleChange}
//                   placeholder="Enquiry Taken By"
//                   error={errors.enquiryTakenBy}
//                 /> */}

//                 <div className="flex flex-col">
//                   <label htmlFor="enquiryTakenBy" className=" text-white mb-1">
//                     Enquiry Taken By
//                   </label>
//                   <select
//                     name="enquiryTakenBy"
//                     value={userData.enquiryTakenBy || ""}
//                     onChange={handleChange}
//                     className="border-b-2 text-white py-2 bg-[#c61d23] focus:outline-none  appearance-none "
//                     style={{
//                       backgroundImage: `url(${Neeche})`,

//                       backgroundRepeat: "no-repeat",
//                       backgroundPosition: "right 10px center",
//                       backgroundSize: "16px",
//                     }}
//                   >
//                     <option value="" className="bg-white " disabled>
//                       Enquiry Taken By
//                     </option>
//                     {enquiryTakenBy?.map(({ label, value }, index) => (
//                       <option
//                         className="bg-white text-black border-2 border-black-2"
//                         key={value}
//                         value={value}
//                       >
//                         {label}
//                       </option>
//                     ))}
//                   </select>
//                   {errors.enquiryTakenBy && (
//                     <span className="text-white text-sm mt-1">
//                       {errors.enquiryTakenBy}
//                     </span>
//                   )}
//                 </div>

//                 {/* Remarks */}
//                 <InputField
//                   label="Remarks"
//                   name="remarks"
//                   value={userData.remarks}
//                   onChange={handleChange}
//                   placeholder="Remark if any"
//                   error={errors.remarks}
//                 />

//                 {/* Buttons */}
//                 <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
//                   <button
//                     type="button"
//                     onClick={() => navigate("/enquiryform")}
//                     className="w-full sm:w-1/3 border border-gray-400 rounded-xl bg-yellow-500 hover:bg-yellow-600 py-2 px-4 "
//                   >
//                     Back
//                   </button>
//                   <button
//                     type="submit"
//                     className="w-full sm:w-2/3 border bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded-xl transition-all"
//                   >
//                     Submit
//                   </button>
//                 </div>

//                 {submitMessage && (
//                   <p
//                     className={`mt-4 text-center text-sm ${
//                       submitMessage.includes("successfully")
//                         ? "text-green-500"
//                         : "text-red-500"
//                     }`}
//                   >
//                     {submitMessage}
//                   </p>
//                 )}
//               </form>
//             </div>
//           </div>
//         </div>

//         {/* Footer Logo */}
//         <div className="flex justify-center items-center">
//           <img
//             src={scholarsDenLogo}
//             alt="Scholars Den Logo"
//             className="w-20 sm:w-24"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TakenBy;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchUserDetails,
  putFormData,
  updateUserDetails,
} from "../../redux/formDataSlice";
import { setLoading } from "../../redux/loadingSlice";
import scholarsDenLogo from "../assets/scholarsDenLogo.png";
import Spinner from "./Spinner";
import FormHeader from "./FormHeader";
import axios from "../../api/axios";
import {
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  MessageSquare,
  UserCheck,
  Newspaper,
  Globe,
  Users as UsersIcon,
  ChevronDown,
} from "lucide-react";

const TakenBy = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const enquiryTakenBy = [
    { label: "Adi Ma'am", value: "adi@scholarsden.in" },
    { label: "Urooj Ma'am", value: "urooj@scholarsden.in" },
    { label: "Diya Ma'am", value: "diya@scholarsden.in" },
    { label: "Priya Ma'am", value: "priya@scholarsden.in" },
    { label: "Yasir Sir", value: "yasir@scholarsden.in" },
  ];

  const rendomNumber = Math.floor(Math.random() * 5);

  useEffect(() => {
    console.log("rendomNumber", rendomNumber);
    dispatch(
      updateUserDetails({ enquiryTakenBy: enquiryTakenBy[rendomNumber].value })
    );
  }, []);

  const { loading } = useSelector((state) => state.loadingDetails);
  const { userData, dataExist } = useSelector((state) => state.userDetails);

  const [errors, setErrors] = useState({});
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "enquiryTakenBy") {
      dispatch(updateUserDetails({ [name]: value }));
    }
    dispatch(updateUserDetails({ [name]: value }));

    if (name === "howToKnow") {
      setShowOtherInput(value === "Other(Please Specify)");
    }

    if (value.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const validateForm = () => {
    const formErrors = {};
    let isValid = true;

    ["enquiryTakenBy"].forEach((field) => {
      if (!userData[field]?.trim()) {
        const formattedField = field
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase());
        formErrors[field] = `${formattedField} is required`;
        isValid = false;
      }
    });

    if (
      userData.howToKnow === "Other(Please Specify)" &&
      !userData.otherSource?.trim()
    ) {
      formErrors.otherSource = "Please specify how you came to know about us.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const putDataOnZohoCrm = async () => {
    try {
      console.log("userData from putDataOnZohoCrm", userData);

      const api_data = {
        Mobile: userData.fatherContactNumber,
        Last_Name: userData?.studentName || "test",
        FatherName: userData.fatherName,
        FatherOccupations: userData.fatherOccupations,
        enquiryNumber : userData.enquiryNumber,
        SchoolName : userData.schoolName,
        Program : userData.program,

        Email: "te@gmail.com",
        Lead_Status: "Fresh Lead",
        Description: "Message",
        City: "webdeveloper@scholarsden.in",
        // EnquiryTakenBy: "webdeveloper@scholarsden.in",
        enquiryTakenBy: "webdeveloper@scholarsden.in",
        testingField: "webdeveloper@scholarsden.in",
        Lead_Source: "enquiry Form",
      };

      const response = await axios.post("/user/zoho/leads", {
        data: [api_data],
      });

      const data = await response.json();
      console.log("Zoho response:", data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    dispatch(setLoading(true));
    setSubmitMessage("");

    if (validateForm()) {
      await dispatch(putFormData(userData));

      console.log("Testdata from the onSUBMIT", userData);

      await putDataOnZohoCrm();

      // document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      // navigate("/FormSubmitted");
    }
    dispatch(setLoading(false));
  };

  return (
    <div className="min-h-screen w-full max-w-[768px] mx-auto bg-gradient-to-br from-[#fdf5f6] via-white to-[#f5eff0]">
      {loading && <Spinner />}

      {/* Form Header */}
      <FormHeader
        title="Enquiry Form"
        subtitle="Final step - Additional details"
        icon={UserCheck}
      />

      {/* Decorative Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none max-w-[768px] mx-auto">
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-br from-[#ffdd00]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-tr from-[#c61d23]/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative py-4 sm:py-6 md:py-8 lg:py-12">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Progress Indicator */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
                Additional Information
              </h2>
              <div className="text-xs sm:text-sm text-gray-600">
                Step 3 of 3
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-[#c61d23] to-[#a01818] h-2 rounded-full transition-all duration-300"
                style={{ width: "100%" }}
              ></div>
            </div>
          </div>

          {/* Form Container */}
          <form
            autoComplete="off"
            onSubmit={onSubmit}
            className="flex flex-col gap-4 sm:gap-5"
          >
            {/* How to Know */}
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-4 sm:p-5 md:p-6">
              <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-900 mb-3">
                <Newspaper
                  size={16}
                  className="text-[#c61d23] sm:w-[18px] sm:h-[18px]"
                />
                <span className="flex-1">How did you hear about us?</span>
                <span className="text-xs text-gray-500 font-normal">
                  (Optional)
                </span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center gap-2 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#c61d23] hover:bg-[#fdf5f6] transition-all">
                  <input
                    type="radio"
                    name="howToKnow"
                    value="News Paper"
                    checked={userData.howToKnow === "News Paper"}
                    onChange={handleChange}
                    className="w-4 h-4 text-[#c61d23] focus:ring-[#c61d23]"
                  />
                  <span className="text-sm text-gray-700">News Paper</span>
                </label>

                <label className="flex items-center gap-2 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#c61d23] hover:bg-[#fdf5f6] transition-all">
                  <input
                    type="radio"
                    name="howToKnow"
                    value="Hoarding/Banner"
                    checked={userData.howToKnow === "Hoarding/Banner"}
                    onChange={handleChange}
                    className="w-4 h-4 text-[#c61d23] focus:ring-[#c61d23]"
                  />
                  <span className="text-sm text-gray-700">Hoarding/Banner</span>
                </label>

                <label className="flex items-center gap-2 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#c61d23] hover:bg-[#fdf5f6] transition-all">
                  <input
                    type="radio"
                    name="howToKnow"
                    value="Reference"
                    checked={userData.howToKnow === "Reference"}
                    onChange={handleChange}
                    className="w-4 h-4 text-[#c61d23] focus:ring-[#c61d23]"
                  />
                  <span className="text-sm text-gray-700">Reference</span>
                </label>

                <label className="flex items-center gap-2 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#c61d23] hover:bg-[#fdf5f6] transition-all">
                  <input
                    type="radio"
                    name="howToKnow"
                    value="Internet"
                    checked={userData.howToKnow === "Internet"}
                    onChange={handleChange}
                    className="w-4 h-4 text-[#c61d23] focus:ring-[#c61d23]"
                  />
                  <span className="text-sm text-gray-700">Internet</span>
                </label>
              </div>

              {showOtherInput && (
                <div className="mt-3">
                  <input
                    type="text"
                    name="otherSource"
                    value={userData.otherSource || ""}
                    onChange={handleChange}
                    placeholder="Please specify"
                    className="w-full text-sm sm:text-base border border-gray-200 rounded-lg p-2.5 sm:p-3 focus:ring-2 focus:ring-[#c61d23] focus:border-transparent focus:outline-none transition-all"
                  />
                  {errors.otherSource && (
                    <div className="flex items-center gap-2 text-red-500 text-xs mt-2">
                      <AlertCircle size={14} />
                      {errors.otherSource}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Enquiry Taken By */}
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-4 sm:p-5 md:p-6">
              <label
                htmlFor="enquiryTakenBy"
                className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3"
              >
                <UserCheck
                  size={16}
                  className="text-[#c61d23] sm:w-[18px] sm:h-[18px]"
                />
                <span className="flex-1">Enquiry Taken By</span>
                <span className="text-[#c61d23]">*</span>
              </label>
              <div className="relative">
                <select
                  id="enquiryTakenBy"
                  name="enquiryTakenBy"
                  value={userData.enquiryTakenBy || ""}
                  onChange={handleChange}
                  className="w-full text-sm sm:text-base appearance-none border border-gray-200 rounded-lg p-2.5 sm:p-3 pr-10 focus:ring-2 focus:ring-[#c61d23] focus:border-transparent focus:outline-none transition-all bg-white cursor-pointer"
                >
                  <option value="">Select counselor</option>
                  {enquiryTakenBy.map(({ label, value }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={18}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
              {errors.enquiryTakenBy && (
                <div className="flex items-center gap-2 text-red-500 text-xs mt-2">
                  <AlertCircle size={14} />
                  {errors.enquiryTakenBy}
                </div>
              )}
            </div>

            {/* Remarks */}
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-4 sm:p-5 md:p-6">
              <label
                htmlFor="remarks"
                className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3"
              >
                <MessageSquare
                  size={16}
                  className="text-[#c61d23] sm:w-[18px] sm:h-[18px]"
                />
                <span className="flex-1">Remarks</span>
                <span className="text-xs text-gray-500 font-normal">
                  (Optional)
                </span>
              </label>
              <textarea
                id="remarks"
                name="remarks"
                value={userData.remarks || ""}
                onChange={handleChange}
                placeholder="Add any additional notes or comments here..."
                rows="4"
                className="w-full text-sm sm:text-base border border-gray-200 rounded-lg p-2.5 sm:p-3 focus:ring-2 focus:ring-[#c61d23] focus:border-transparent focus:outline-none transition-all resize-none"
              />
            </div>

            {/* Error Message */}
            {submitMessage && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 sm:p-4 flex items-start gap-2 sm:gap-3">
                <AlertCircle
                  size={16}
                  className="text-red-500 flex-shrink-0 mt-0.5 sm:w-[18px] sm:h-[18px]"
                />
                <p className="text-xs sm:text-sm text-red-700">
                  {submitMessage}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4 sm:mt-6 md:mt-8">
              <button
                type="button"
                onClick={() => navigate("/enquiryform")}
                className="flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-200 bg-white hover:bg-gray-50 text-gray-900 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 active:scale-95"
              >
                <ArrowLeft size={18} />
                <span className="hidden sm:inline">Back</span>
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-[2] flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#c61d23] to-[#a01818] hover:from-[#b01820] hover:to-[#8f1515] text-white text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              >
                <span>{loading ? "Submitting..." : "Submit"}</span>
                {!loading && <ArrowRight size={18} />}
              </button>
            </div>
          </form>

          {/* Logo */}
        </div>
      </div>
    </div>
  );
};

export default TakenBy;
