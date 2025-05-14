import { useState, useEffect } from "react";

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

  const [otherCity, setOtherCity] = useState(false);

  const { loading } = useSelector((state) => state.loadingDetails);

  const [submitMessage, setSubmitMessage] = useState("");
  const [program, setProgram] = useState(""); // For dynamic courses

  const { userData, dataExist, userDataError } = useSelector(
    (state) => state.userDetails
  );

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Puducherry",
    "Ladakh",
    "Jammu and Kashmir",
  ];

  const [errors, setErrors] = useState({
    program: "",
    courseOfIntrested: "",
    schoolName: "",
    fatherName: "",
    fatherOccupations: "",
    // studentContactNumber: "",
    city: "",
    state: "",
  });

  // const programOptions = {
  //   Foundation: ["VI", "VII", "VIII", "IX", "X"],
  //   "JEE(Main & Adv.)": [
  //     "XI Engineering",
  //     "XII Engineering",
  //     "XII Pass Engineering",
  //   ],
  //   "NEET(UG)": ["XI Medical", "XII Medical", "XII Pass Medical"],
  // };

  const programOptions = {
    "Foundationg": ["VI", "VII", "VIII", "IX", "X"],
    "JEE(Main & Adv)": [
      "XI Engineering",
      "XII Engineering",
      "XII Passed Engineering",
    ],
    "NEET(UG)": ["XI Medical", "XII Medical", "XII Passed Medical"],
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("named", [name], name);
    console.log("named", value);

    if (name === "city") {
      console.log("userData[name]", value);
      if (value === "Other") {
        setOtherCity(true);
        dispatch(updateUserDetails({ city: "" }));
        return;
      } else if (value === "") {
        setOtherCity(false);
        // dispatch(updateUserDetails({ city: "" }));
        return;
      } else {
        if (value === "Moradabad") {
          setOtherCity(false);
        }
        dispatch(updateUserDetails({ city: value }));
        dispatch(updateUserDetails({ state: "Uttar Pradesh" }));
      }
    }

    if (name === "state") {
      console.log("userData[name]", userData[name]);
    }

    if (name === "program") {
      setProgram(value); // Update program selection
      dispatch(updateUserDetails({ program: value })); // Reset course when program changes
    }
    //  else if(name === "state"){
    //   dispatch(updateUserDetails({state: value}))
    // }
    else if (name === "studentContactNumber") {
      dispatch(updateUserDetails({ studentContactNumber: value }));
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


    // if (
    //   userData.studentContactNumber !== "" &&
    //   !/^\d{10}$/.test(userData.studentContactNumber)
    // ) {
    //   formErrors.studentContactNumber =
    //     "Student's Contact Number must be a valid 10-digit number";
    //   isValid = false;
    // }

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

    console.log("fetchUserDetails called", userData["city"]);
    console.log("fetchUserDetails called", userData.city);
    if (userData["city"] !== "Moradabad" && userData["city"] !== "" && userData["city"] !== undefined) {
      setOtherCity(true);
    }
  }, []);

  useEffect(() => {
    console.log("userData from useEffect", userData);

    console.log("userData.data", userData["city"]);
  }, [userData]);

  useEffect(() => {
    if (document.cookie === "") {
      navigate("/");
      return;
    }
    console.log("Running  ");
    setProgram(userData.program || "");
  }, [dataExist]);

  return (
    <div className="min-h-screen w-full bg-[#c61d23] px-2 md:px-8 py-2 overflow-auto max-w-[768px]">
      {loading && <Spinner />}

      <div className="flex flex-col gap-6 max-w-screen-md mx-auto">
        <div>
          <FormHeader />
        </div>

        <h1 className="text-3xl md:text-4xl font-semibold text-white text-center">
          Enquiry Form
        </h1>

        <form
          autoComplete="off"
          onSubmit={onSubmit}
          className="flex flex-col gap-y-6 w-full bg-[#c61d23]"
        >
          {/* PROGRAM */}
          <div>
            <select
              name="program"
              value={userData.program || ""}
              onChange={handleChange}
              className="w-full border-b-2 border-white text-white bg-[#c61d23] py-3 pr-8 focus:outline-none appearance-none"
              style={{
                backgroundImage: `url(${Neeche})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px center",
                backgroundSize: "16px",
              }}
            >
              <option value="" className="bg-white text-black" disabled>
                *Program
              </option>
              {Object.keys(programOptions).map((program) => (
                <option
                  className="bg-white text-black"
                  key={program}
                  value={program}
                >
                  {program === "Foundation"
                    ? `${program} (VI - X)`
                    : `${program} (XI - XII Passed)`}
                </option>
              ))}
            </select>
            {errors.program && (
              <p className="text-white text-sm mt-1">{errors.program}</p>
            )}
          </div>

          {/* COURSE */}
          <div>
            <select
              name="courseOfIntrested"
              value={userData.courseOfIntrested || ""}
              onChange={handleChange}
              className="w-full border-b-2 border-white text-white bg-[#c61d23] py-3 pr-8 focus:outline-none appearance-none"
              style={{
                backgroundImage: `url(${Neeche})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px center",
                backgroundSize: "16px",
              }}
            >
              <option value="" className="bg-white text-black" disabled>
                *Course interested in
              </option>
              {program &&
                programOptions[program].map((course) => (
                  <option
                    className="bg-white text-black"
                    key={course}
                    value={course}
                  >
                    {course}
                  </option>
                ))}
            </select>
            {errors.courseOfIntrested && (
              <p className="text-white text-sm mt-1">
                {errors.courseOfIntrested}
              </p>
            )}
          </div>

          {/* TEXT INPUTS */}
          <div className="grid grid-cols-1 gap-x-4 gap-y-6">
            {[{ label: "School Name", name: "schoolName", type: "text" }].map(
              ({ label, name, type }) => (
                <div key={name}>
                  <input
                    type={type}
                    name={name}
                    value={userData[name] || ""}
                    onChange={handleChange}
                    placeholder={label}
                    className="w-full border-b-2 border-white text-white py-3 bg-[#c61d23] focus:outline-none placeholder-white appearance-none"
                  />
                  {errors[name] && (
                    <p className="text-white text-sm mt-1">{errors[name]}</p>
                  )}
                </div>
              )
            )}

            <div className="text-white flex gap-4">
              <div className="flex gap-1">
                <input
                  type="radio"
                  name="city"
                  value="Moradabad"
                  checked={userData.city == "Moradabad"}
                  onChange={handleChange}
                />
                <label htmlFor="">Moradabad</label>
              </div>

              <div className="flex gap-2">
                <input
                  type="radio"
                  name="city"
                  checked={userData.city !== "Moradabad" && otherCity}
                  value="Other"
                  onChange={handleChange}
                />
                <label htmlFor="">Other</label>
              </div>
            </div>

            {otherCity && (
              <div>
                <input
                  type="text"
                  name="city"
                  value={userData.city || ""}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full border-b-2 border-white text-white py-3 bg-[#c61d23] focus:outline-none placeholder-white appearance-none"
                />

                {errors["city"] && (
                  <p className="text-white text-sm mt-1">{errors["city"]}</p>
                )}
              </div>
            )}

            {/* STATE */}
            {otherCity && (
              <div>
                <select
                  name="state"
                  value={userData.state || "Uttar Pradesh"}
                  onChange={handleChange}
                  className="w-full border-b-2 border-white text-white bg-[#c61d23] py-3 pr-8 focus:outline-none appearance-none"
                  style={{
                    backgroundImage: `url(${Neeche})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 10px center",
                    backgroundSize: "16px",
                  }}
                >
                  <option value="" className="bg-white text-black">
                    State
                  </option>
                  <option
                    value="Uttar Pradesh"
                    className="bg-white text-black"
                    selected
                  >
                    Uttar Pradesh
                  </option>
                  {indianStates.map((state) => (
                    <option
                      className="bg-white text-black"
                      key={state}
                      value={state}
                    >
                      {state}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className="text-white text-sm mt-1">{errors.state}</p>
                )}
              </div>
            )}
          </div>

          {/* STUDENT CONTACT */}
          {/* <div>
            <input
              type="tel"
              name="studentContactNumber"
              value={userData.studentContactNumber || ""}
              onChange={handleChange}
              placeholder="Student's Contact No. (if any)"
              className="w-full border-b-2 border-white text-white py-3 bg-[#c61d23] focus:outline-none placeholder-white appearance-none"
            />
            {errors.studentContactNumber && (
              <p className="text-white text-sm mt-1">
                {errors.studentContactNumber}
              </p>
            )}
          </div> */}

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
            <button
              onClick={() => navigate(-1)}
              type="button"
              className="w-full sm:w-1/3 border bg-yellow-500 hover:bg-yellow-600 rounded-xl text-black  py-2 px-4 "
            >
              Back
            </button>
            <button
              type="submit"
              className="w-full sm:w-2/3 border bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded-xl transition-all"
            >
              Next
            </button>
          </div>
        </form>

        {/* SUBMIT MESSAGE */}
        {submitMessage && (
          <div className="w-full text-center">
            <p
              className={`text-sm ${
                submitMessage === "successfully"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
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

export default EnquiryForm;
