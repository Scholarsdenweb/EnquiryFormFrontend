import React, { useState, useEffect } from "react";

// 2sFOzXAu3htadEMdLt6pMWh1Nk4_6oNB6RFWJqFqsEBdpP2EG

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Neeche from "../assets/Neeche.png";
import {
  fetchUserDetails,
  putFormData,
  updateUserDetails,
} from "../../redux/formDataSlice";
import Spinner from "./Spinner";
import { setLoading } from "../../redux/loadingSlice";
import FormHeader from "./FormHeader";
import scholarsDenLogo from "../assets/scholarsDenLogo.png";

const EnquiryForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.loadingDetails);

  const [submitMessage, setSubmitMessage] = useState("");
  const [program, setProgram] = useState(""); // For dynamic courses

  const { userData, dataExist, userDataError } = useSelector(
    (state) => state.userDetails
  );

  const [errors, setErrors] = useState({
    program: "",
    courseOfIntrested: "",
    schoolName: "",
    fatherName: "",
    fatherOccupations: "",
    studentContactNumber: "",
    city: "",
  });

  const programOptions = {
    Foundation: ["6th", "7th", "8th", "9th", "10th"],
    "IIT-JEE": ["11th Engineering", "12th Engineering"],
    NEET: ["11th Medical", "12th Medical"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "program") {
      setProgram(value); // Update program selection
      dispatch(updateUserDetails({ program: value })); // Reset course when program changes
    } else {
      dispatch(updateUserDetails({ [name]: value }));
    }

    if (value.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const validateForm = () => {
    const formErrors = {};
    let isValid = true;
    console.log("userDatafrom validateForm", userData);

    ["program", "courseOfIntrested", "city"].forEach((field) => {
      console.log("userData[field]", userData[field]);
      if (!userData[field]) {
        // Capitalize the first letter of the field and add spaces before capital letters
        const formattedField = field
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase());
        formErrors[field] = `${formattedField} is required`;
        isValid = false;
      }
    });

    console.log(
      "userData.studentContactNumber",
      userData[studentContactNumber]
    );

    if (
      userData.studentContactNumber !== undefined &&
      !/^\d{10}$/.test(userData.studentContactNumber)
    ) {
      formErrors.studentContactNumber =
        "Student's Contact Number must be a valid 10-digit number";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const onSubmit = async (e) => {
    dispatch(setLoading(true));
    e.preventDefault();
    setSubmitMessage("");

    if (validateForm()) {
      await dispatch(putFormData(userData));

      if (dataExist) {
        navigate("/enquiryForm/takenBy");
      } else {
        setSubmitMessage(userDataError);
      }
    }
    await dispatch(setLoading(false));
  };

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, []);

  useEffect(() => {
    if (document.cookie === "") {
      navigate("/");
      return;
    }
    console.log("Running  ");
    setProgram(userData.program || "");
  }, [dataExist]);

  return (
    <div
      className="overflow-auto w-full items-center px-6 "
      style={{ backgroundColor: "#c61d23", paddingBottom: "3px" }}
    >
      {loading && (
        <Spinner />
      ) }
        <div className="grid grid-rows-8 flex-col w-full h-full ">
          <div className="row-span-2">
            <FormHeader />
          </div>

          <div className=" row-span-5 px-9 flex flex-col justify-center items-center gap-6 overflow-auto ">
            <div className="w-2/3  ">
              <div
                className="flex flex-col gap-2"
                style={{ backgroundColor: "#c61d23" }}
              >
                <h1 className="text-4xl font-normal px-4 pt-5 text-white w-full text-center mb-4">
                  Enquiry Form
                </h1>
                <form
                  autoComplete="off"
                  className="flex flex-col gap-4 w-full p-2 "
                  onSubmit={onSubmit}
                >
                  <div className="flex flex-col   ">
                    {/* <label
                    htmlFor="program"
                    className="text-xl font-semibold mb-1"
                  >
                    Program
                  </label> */}
                    <select
                      name="program"
                      value={userData.program || ""}
                      onChange={handleChange}
                      className="border-b-2 border-white text-white py-3 bg-[#c61d23] focus:outline-none appearance-none"
                      style={{
                        backgroundImage: `url(${Neeche})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 10px center",
                        backgroundSize: "16px",
                      }}
                    >
                      <option value="" className="bg-white" disabled>
                        *Program
                      </option>
                      {Object.keys(programOptions).map((program) => (
                        <option
                          className="bg-white text-black border-2 border-black-2"
                          key={program}
                          value={program}
                        >
                          {program}
                        </option>
                      ))}
                    </select>
                    {errors.program && (
                      <p className="text-black text-xs mt-1 ">
                        {errors.program}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col    " key="courseOfIntrested">
                    <select
                      name="courseOfIntrested"
                      value={userData.courseOfIntrested || ""}
                      onChange={handleChange}
                      className="border-b-2 text-white py-2 bg-[#c61d23] focus:outline-none appearance-none"
                      style={{
                        backgroundImage: `url(${Neeche})`,

                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 10px center",
                        backgroundSize: "16px",
                      }}
                    >
                      <option
                        key="selectCourse"
                        className="bg-white text-black"
                        value=""
                        disabled
                      >
                        *Course interested in
                      </option>
                      {program &&
                        programOptions[program].map((data) => (
                          <option
                            className="bg-white text-black border-2 border-black-2"
                            key={data}
                            value={data}
                          >
                            {data}
                          </option>
                        ))}
                    </select>
                    {errors.courseOfIntrested && (
                      <p className="text-black text-xs mt-1 ">
                        {errors.courseOfIntrested}
                      </p>
                    )}
                  </div>

                  {[
                    { label: "School Name", name: "schoolName", type: "text" },

                    // {
                    //   label: "Parent's Occupations",
                    //   name: "parentsOccupations",
                    //   type: "text",
                    // },
                    {
                      label: "Student's Contact no (if any)",
                      name: "studentContactNumber",
                      type: "tel",
                    },
                    { label: "*City/Town/Village", name: "city", type: "text" },
                    {
                      label: "State",
                      name: "state",
                      type: "text",
                    },
                  ].map(({ label, name, type }) => (
                    <div className="flex flex-col   " key={label}>
                      {/* <label
                      htmlFor={name}
                      className="text-xl font-semibold mb-1"
                    >
                      {label}
                    </label> */}
                      <input
                        autoComplete="off"
                        type={type}
                        id={name}
                        name={name}
                        value={userData[name] || ""}
                        onChange={handleChange}
                        placeholder={`${label}`}
                        className="border-b-2 border-white text-white py-2 bg-[#c61d23] focus:outline-none placeholder-white  appearance-none"
                      />

                      {errors[name] && (
                        <p className="text-white text-xs mt-1  ">
                          {errors[name]}
                        </p>
                      )}
                    </div>
                  ))}

                  {/* Submit and Navigation Buttons */}
                  <div className="flex justify-between items-center text-sm mt-8 ">
                    <button
                      disabled
                      type="button"
                      className="border border-gray-400 rounded-full bg-[#a71a1f] text-gray-400 font-semibold py-2 px-8 transition duration-200 cursor-not-allowed "
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="border rounded-full bg-[#c61d23] hover:bg-[#a71a1f] text-white py-2 w-1/2 transition duration-200"
                    >
                      Next
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {submitMessage && (
              <div className="w-full text-center">
                <p
                  className={`text-sm ${
                    submitMessage === "successfully"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {submitMessage}
                </p>
              </div>
            )}
          </div>

          <div className="row-span-1 w-full h-full flex  justify-center items-center ">
            {/* <div className=""> */}
            <div className=" w-24 ">
              <img src={scholarsDenLogo} alt="" />
            </div>
            {/* </div>  */}
          </div>
        </div>
    
    </div>
  );
};

export default EnquiryForm;
