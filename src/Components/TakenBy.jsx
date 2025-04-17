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
    "sonali@scholarsden.in",
    "urooj@scholarsden.in",
    "diya@scholarsden.in",
    "priya@scholarsden.in",
    "admission@scholarsden.in",
  ];

  const rendomNumber = Math.floor(Math.random() * 4);

  useEffect(() => {
    console.log("rendomNumber", rendomNumber);
    dispatch(
      updateUserDetails({ enquiryTakenBy: enquiryTakenBy[rendomNumber] })
    );
  }, []);

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

  // const putDataOnExtraEdge = async () => {
  //   console.log("userData from putDataOnExtraEdge", userData);

  //   const url = "https://thirdpartyapi.extraaedge.com/api/SaveRequest";

  //   const headers = {
  //     "Content-Type": "application/json",
  //   };

  //   // const apiData = { Source: "scholarsden", AuthToken: "SCHOLARSDEN-30-03-2024", FirstName : userData.studente };

  //   const apiData = {
  //     Source: "scholarsden",
  //     AuthToken: "SCHOLARSDEN-30-03-2024",
  //     FirstName: userData.studentName || "",
  //     Email: userData.email || "",
  //     Center: userData.courseOfIntrested || "",
  //     Course: userData.program || "", // Assuming 'program' corresponds to 'Center'
  //     State: userData.state || "", // No mapping in provided data, you may need to add this
  //     City: userData.city || "",
  //     Remarks: userData.remarks || "",
  //     leadCampaign: "Walk-in",
  //     LeadSource: "140",

  //     Field4: userData.brochureGiven,
  //     Field5: userData.howToKnow,
  //     ReferredToEmail: userData.enquiryTakenBy,
  //     Textb1: userData.intime,

  //     Textb3: userData.schoolName,
  //     Textb2: userData.fatherOccupations,
  //     FathersName: userData.fatherName || "",

  //     // imporovement Available
  //     // MobileNumber: userData.studentContactNumber || "",
  //     // FathersPhoneNumber: userData.fatherContactNumber || "",

  //     MobileNumber: userData.fatherContactNumber || "",
  //     FathersPhoneNumber: userData.studentContactNumber || "",

  //     // Not added yet

  //     // SchoolName: userData.schoolName || "",
  //     // // EnquiryTakenBy: userData.enquiryTakenBy || "",
  //     // // BrochureGiven: userData.brochureGiven || "",
  //     // enquiryTakenBy: data?.enquiryTakenBy || "",
  //     // fatherOccupations: userData.fatherOccupations || "",
  //   };

  //   console.log("apiData", apiData);

  //   console.log("apiData from putDataOnExtraEdge", apiData);

  //   try {
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: headers,
  //       body: JSON.stringify(apiData),
  //     });

  //     console.log("Raw response:", response);

  //     const contentType = response.headers.get("content-type");

  //     if (!response.ok) {
  //       throw new Error(`Request failed with status: ${response.status}`);
  //     }

  //     if (contentType && contentType.includes("application/json")) {
  //       const responseData = await response.json();
  //       console.log("Response Data:", responseData);
  //     } else {
  //       const textResponse = await response.text();
  //       console.log("Non-JSON Response:", textResponse);
  //     }
  //   } catch (error) {
  //     console.log("Error:", error);
  //   }
  // };

  const onSubmit = async (e) => {
    e.preventDefault();

    dispatch(setLoading(true));
    setSubmitMessage("");

    if (validateForm()) {
      await dispatch(putFormData(userData));

      // await putDataOnExtraEdge();

      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      navigate("/FormSubmitted");
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    console.log("userData from useEffect", userData);
  }, [userData]);

  return (
    <div className="min-h-screen w-full overflow-auto px-4 md:px-8 py-2 bg-[#c61d23] max-w-[768px]">
      {loading && <Spinner />}
      <div className="flex flex-col gap-16 justify-between">
        <div>
          <FormHeader />

          <div className="flex flex-col items-center mt-6">
            <div className="w-full max-w-2xl">
              <h1 className="text-3xl sm:text-4xl font-semibold text-white text-center mb-6">
                Enquiry Form
              </h1>

              <form
                autoComplete="off"
                className="flex flex-col gap-4 w-full"
                onSubmit={onSubmit}
              >
                {/* How to Know */}
                {/* <SelectField
                  label="How do you come to know about us?"
                  name="howToKnow"
                  value={userData?.howToKnow}
                  options={options}
                  onChange={handleChange}
                  error={errors.howToKnow}
                /> */}

                <div className="flex flex-col flex-wrap">
                  <label htmlFor="howToKnow" className="text-lg text-white ">
                    How do you come to know about us?
                  </label>

                  <div className="flex flex-wrap gap-4 pl-4">
                    <div className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="howToKnow"
                        value={"News Paper"}
                        checked={userData.howToKnow === "News Paper"}
                        onChange={handleChange}
                      />
                      <label className="text-white text-lg ">News Paper</label>
                    </div>
                    <div className="flex items-center gap-1 ">
                      <input
                        type="radio"
                        name="howToKnow"
                        value="Hoading/Banner"
                        checked={userData.howToKnow === "Hoading/Banner"}
                        onChange={handleChange}
                      />
                      <label className="text-white text-lg ">
                        Hoading/Banner
                      </label>
                    </div>
                    <div className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="howToKnow"
                        value={"Reference"}
                        onChange={handleChange}
                        checked={userData.howToKnow === "Reference"}
                      />
                      <label className="text-white text-lg ">Reference</label>
                    </div>
                    <div className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="howToKnow"
                        value="Internet"
                        checked={userData.howToKnow === "Internet"}
                        onChange={handleChange}
                      />
                      <label className="text-white text-lg ">Internet</label>
                    </div>
                  </div>
                </div>

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

                {/* Enquiry Taken By */}
                {/* <SelectField
                  label="Enquiry Taken By"
                  name="enquiryTakenBy"
                  value={userData.enquiryTakenBy}
                  options={enquiryTakenBy}
                  onChange={handleChange}
                  placeholder="Enquiry Taken By"
                  error={errors.enquiryTakenBy}
                /> */}

                {/* Remarks */}
                <InputField
                  label="Remarks"
                  name="remarks"
                  value={userData.remarks}
                  onChange={handleChange}
                  placeholder="Remark if any"
                  error={errors.remarks}
                />

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
                  <button
                    type="button"
                    onClick={() => navigate("/enquiryForm")}
                    className="w-full sm:w-1/3 border border-gray-400 rounded-xl bg-yellow-500 hover:bg-yellow-600 py-2 px-4 cursor-not-allowed"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-2/3 border bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded-xl transition-all"
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

        {/* Footer Logo */}
        <div className="flex justify-center items-center">
          <img
            src={scholarsDenLogo}
            alt="Scholars Den Logo"
            className="w-20 sm:w-24"
          />
        </div>
      </div>
    </div>
  );
};

export default TakenBy;
