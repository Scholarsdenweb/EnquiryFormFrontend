import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Neeche from "../assets/Neeche.png";

import {
  fetchUserDetails,
  putFormData,
  updateUserDetails,
} from "../../redux/formDataSlice";
import { setLoading } from "../../redux/loadingSlice";
import scholarsDenLogo from "../assets/scholarsDenLogo.png";
import Spinner from "./Spinner";
import FormHeader from "./FormHeader";

// Reusable Input Component
const InputField = ({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
}) => ( 
  <div className="flex flex-col">
    {/* <label htmlFor={name} className="text-lg font-semibold mb-1">
      {label}
    </label> */}
    <input
      autoComplete="off"
      type={type}
      name={name}
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      className="border-b-2 border-white text-white py-2 bg-[#c61d23] focus:outline-none placeholder-white  appearance-none"
    />
    {error && <span className="text-white text-sm mt-1">{error}</span>}
  </div>
);

// Reusable Select Component
const SelectField = ({ label, name, value, options, onChange, error }) => (
  <div className="flex flex-col">
    {/* <label htmlFor={name} className="text-lg font-semibold mb-1">
      {label}
    </label> */}
    <select
      name={name}
      value={value || ""}
      onChange={onChange}
      className="border-b-2 text-white py-2 bg-[#c61d23] focus:outline-none  appearance-none "
      style={{
        backgroundImage: `url(${Neeche})`,

        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 10px center",
        backgroundSize: "16px",
      }}
    >
      <option value="" className="bg-white " disabled>
        {label}
      </option>
      {options.map((option) => (
        <option
          className="bg-white text-black border-2 border-black-2"
          key={option}
          value={option}
        >
          {option}
        </option>
      ))}
    </select>
    {error && <span className="text-white text-sm mt-1">{error}</span>}
  </div>
);

const TakenBy = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const options = [
    "Times of India",
    "Amar Ujala",
    "Danik Jagran",
    "Hindustan",
    "Hoarding/Banner",
    "Friend",
    "Internet",
    "Other(Please Specify)",
  ];

  const enquiryTakenBy = [
    "Sonali@scholarsden.in",
    "Urooj@scholarsden.in",
    "rashmi@scholarsden.in",
    "Priya@scholarsden.in",
    "admission@scholarsden.in",
  ];
  const { loading } = useSelector((state) => state.loadingDetails);

  const { userData, dataExist } = useSelector((state) => state.userDetails);

  const [errors, setErrors] = useState({});
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    dispatch(fetchUserDetails());
    console.log("userData from useEffect", userData);
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
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

    [
      // "howToKnow",
      // "remarks",
      // "intime",
      // "enquiryTakenBy",
      // "brochureGiven",
    ].forEach((field) => {
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

  // const putDataOnExtraEdge = async () => {
  //   console.log("userData from putDataOnExtraEdge", userData);
  //   // API URL
  //   const url = "https://thirdpartyapi.extraaedge.com/api/SaveRequest";

  //   // Request Headers
  //   const headers = {
  //     "Content-Type": "application/json", // Define the content type as JSON
  //     AuthToken: "SCHOLARSDEN-30-03-2024", // Add the AuthToken
    
  //   };

  //   // API Data (Replace this with your actual payload if necessary)
  //   const apiData = {...userData, "Source": "scholarsden"};


  //   console.log("apiData.............................................. from putDataOnExtraEdge", apiData);
      
 
   

  //   // Sending the POST request using fetch
  // fetch(url, {
  //     method: "POST", // Request type is POST
  //     headers: headers, // Setting the headers
  //     body: JSON.stringify(apiData), // Convert the data to JSON format
  //   })
  //     .then((response) => {
  //       // Check if the response status is OK (status code 200)
 
  //       if (response.ok) {
  //         console.log("Request was successful!");
  //         return response.json(); // Parse the response body as JSON
  //       } else {
  //         throw new Error("Request failed with status: " + response.status);
  //       }
  //     })
  //     .then((responseData) => {
  //       console.log("Request was successful!");
  //       console.log("Response Data:", responseData); // Log the response data
  //     })
  //     .catch((error) => {
  //       console.log("Error:", error); // Log any errors
  //     });
  // };






  // const putDataOnExtraEdge = async () => {
  //   console.log("userData from putDataOnExtraEdge", userData);
  //   // API URL
  //   const url = "https://thirdpartyapi.extraaedge.com/api/SaveRequest";
  
  //   // Request Headers
  //   const headers = {
  //     "Content-Type": "application/json", // Define the content type as JSON
  //     AuthToken: "SCHOLARSDEN-30-03-2024", // Add the AuthToken
  //   };
  
  //   // API Data (Replace this with your actual payload if necessary)
  //   const apiData = {...userData, "Source": "scholarsden"};
    
  //   console.log("apiData.............................................. from putDataOnExtraEdge", apiData);
  
  //   // Sending the POST request using fetch
  //   fetch(url, {
  //     method: "POST", // Request type is POST
  //     headers: headers, // Setting the headers
  //     body: JSON.stringify(apiData), // Convert the data to JSON format
  //   })
  //     .then((response) => {
  //       console.log("Raw response:", response);
  //       // Check if the response is OK (status code 200)
  //       if (response.ok) {
  //         // Try parsing the response body as JSON
  //         return response.json();
  //       } else {
  //         throw new Error("Request failed with status: " + response.status);
  //       }
  //     })
  //     .then((responseData) => {
  //       console.log("Response Data:", responseData); // Log the response data
  //     })
  //     .catch((error) => {
  //       console.log("Error:", error); // Log any errors
  //     });
  // };
  






  const putDataOnExtraEdge = async () => {
    console.log("userData from putDataOnExtraEdge", userData);
    
    const url = "https://thirdpartyapi.extraaedge.com/api/SaveRequest";
  
    const headers = {
      "Content-Type": "application/json"
      
    };



  
    // const apiData = { Source: "scholarsden", AuthToken: "SCHOLARSDEN-30-03-2024", FirstName : userData.studente };

    const apiData = {
      Source: "scholarsden",
      AuthToken: "SCHOLARSDEN-30-03-2024",
      FirstName: userData.studentName || "",
      Email: userData.email || "",
      Center: userData.courseOfIntrested || "",
      Course: userData.program || "", // Assuming 'program' corresponds to 'Center'
      State: userData.state || "", // No mapping in provided data, you may need to add this
      City: userData.city || "",
      Remarks: userData.remarks || "",
      leadCampaign: "Walk-in",
      LeadSource: "140",
      
      
      Field4: userData.brochureGiven,
      Field5: userData.howToKnow,
      ReferredToEmail: userData.enquiryTakenBy,
      Textb1: userData.intime,
      
      
      
      Textb3: userData.schoolName,
      Textb2: userData.fatherOccupations,
      FathersName: userData.fatherName || "",
      MobileNumber: userData.studentContactNumber || "",
      FathersPhoneNumber: userData.fatherContactNumber || "",
      
// Not added yet

      // SchoolName: userData.schoolName || "",
      // // EnquiryTakenBy: userData.enquiryTakenBy || "",
      // // BrochureGiven: userData.brochureGiven || "",
      // enquiryTakenBy: data?.enquiryTakenBy || "",
      // fatherOccupations: userData.fatherOccupations || "",



  };
  
  console.log("apiData", apiData);





  
    console.log("apiData from putDataOnExtraEdge", apiData);
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(apiData),
      });
  
      console.log("Raw response:", response);
  
      const contentType = response.headers.get("content-type");
  
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
  
      if (contentType && contentType.includes("application/json")) {
        const responseData = await response.json();
        console.log("Response Data:", responseData);
      } else {
        const textResponse = await response.text();
        console.log("Non-JSON Response:", textResponse);
      }
  
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

      await putDataOnExtraEdge();

      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      navigate("/FormSubmitted");
    }
    dispatch(setLoading(false));
  };


  useEffect(() => {
    console.log("userData from useEffect", userData);
  }, [userData])

  return (
    // <div className=" flex flex-col justify-center items-center w-full h-screen bg-white p-5 ">

    <div
      className="overflow-auto w-full items-center px-6 "
      style={{ backgroundColor: "#c61d23", paddingBottom: "3px" }}
    >
      {loading && <Spinner />}
      <div className="grid grid-rows-8  flex-col w-full h-full ">
        <div className="row-span-2">
          <FormHeader />
        </div>

        <div className="row-span-5 px-9 flex flex-col justify-center items-center gap-4  overflow-auto">
          <div className="w-2/3 ">
            <div className=" " style={{ backgroundColor: "#c61d23" }}>
              {/* <div className="h-1/3 flex items-center "> */}
              <h1 className="text-4xl font-normal pt-5 px-4 text-white w-full text-center mb-4">
                Enquiry Form
              </h1>
              {/* </div> */}
              <form
                autoComplete="off"
                className="flex flex-col gap-4 w-full p-2"
                onSubmit={onSubmit}
              >
                {/* How to Know */}
                <SelectField
                  label="How do you come to know about us?"
                  name="howToKnow"
                  value={userData?.howToKnow}
                  options={options}
                  onChange={handleChange}
                  error={errors.howToKnow}
                />

      
                {showOtherInput && (
                  <InputField
                    label="Please Specify"
                    name="otherSource"
                    value={userData.otherSource}
                    onChange={handleChange}
                    placeholder="Other(Please Specify)"
                    error={errors.otherSource}
                  />
                )}

         
                <InputField
                  label="Intime"
                  name="intime"
                  value={userData.intime}
                  onChange={handleChange}
                  placeholder="In Times"
                  error={errors.intime}
                />

                {/* Enquiry Taken By */}
                <SelectField
                  label="Enquiry Taken By"
                  name="enquiryTakenBy"
                  value={userData.enquiryTakenBy}
                  options={enquiryTakenBy}
                  onChange={handleChange}
                  placeholder="Enquiry Taken By"
                  error={errors.enquiryTakenBy}
                />

                {/* Brochure Given */}
                <SelectField
                  label="Brochure Given"
                  name="brochureGiven"
                  value={userData.brochureGiven}
                  options={["Yes", "No"]}
                  onChange={handleChange}
                  error={errors.brochureGiven}
                />
                {/* Remarks */}
                <InputField
                  label="Remarks"
                  name="remarks"
                  value={userData.remarks}
                  onChange={handleChange}
                  placeholder="Remark if any"
                  error={errors.remarks}
                />

                {/* Submit and Navigation Buttons */}
                <div className="flex justify-between items-center twxt-sm mt-9">
                  <button
                    type="button"
                    onClick={() => navigate("/enquiryForm")}
                    className="border rounded-full bg-[#c61d23] hover:bg-[#a71a1f] text-white font-semibold py-2 px-8 transition duration-200"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="border rounded-full bg-[#c61d23] hover:bg-[#a71a1f] text-white font-semibold py-2 w-1/2 transition duration-200"
                  >
                    Submit
                  </button>
                </div>

                {submitMessage && (
                  <p
                    className={`mt-4 text-center text-sm ${
                      submitMessage.includes("successfully")
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {submitMessage}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        <div className="row-span-1 w-full flex justify-center items-center ">
          {/* <div className=""> */}
          <div className=" w-24">
            <img src={scholarsDenLogo} alt="" />
          </div>
          {/* </div>  */}
        </div>
      </div>
    </div>

    // </div>
  );
};

export default TakenBy;
