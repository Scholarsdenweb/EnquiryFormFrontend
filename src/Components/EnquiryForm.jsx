import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserDetails,
  putFormData,
  updateUserDetails,
} from "../../redux/formDataSlice";
import Spinner from "./Spinner";
import { setLoading } from "../../redux/loadingSlice";
import FormHeader from "./FormHeader";
import scholarsDenLogo from "../assets/scholarsDenLogo.png";
import {
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  BookOpen,
  GraduationCap,
  School,
  MapPin,
  ChevronDown,
} from "lucide-react";

const EnquiryForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [otherCity, setOtherCity] = useState(false);

  const { loading } = useSelector((state) => state.loadingDetails);

  const [submitMessage, setSubmitMessage] = useState("");
  const [program, setProgram] = useState("");

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
    city: "",
    state: "",
  });

  const programOptions = {
    Foundation: ["VI", "VII", "VIII", "IX", "X"],
    "JEE(Main & Adv)": [
      "XI Engineering",
      "XII Engineering",
      "XII Passed Engineering",
      "Test Series (Class XII / XII Passed)",
    ],
    "NEET(UG)": [
      "XI Medical",
      "XII Medical",
      "XII Passed Medical",
      "Test Series (Class XII / XII Passed)",
    ],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "city") {
      if (value === "Other") {
        setOtherCity(true);
        dispatch(updateUserDetails({ city: "" }));
        return;
      } else if (value === "") {
        setOtherCity(false);
        return;
      } else {
        if (value === "Moradabad") {
          setOtherCity(false);
        }
        dispatch(updateUserDetails({ city: value }));
        dispatch(updateUserDetails({ state: "Uttar Pradesh" }));
      }
    }

    if (name === "program") {
      setProgram(value);
      dispatch(updateUserDetails({ program: value }));
    } else if (name === "studentContactNumber") {
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

    ["program", "courseOfIntrested", "city"].forEach((field) => {
      if (!userData[field]) {
        const formattedField = field
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase());
        formErrors[field] = `${formattedField} is required`;
        isValid = false;
      }
    });

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

    if (
      userData["city"] !== "Moradabad" &&
      userData["city"] !== "" &&
      userData["city"] !== undefined
    ) {
      setOtherCity(true);
    }
  }, []);

  // useEffect(() => {
  //   if (document.cookie === "") {
  //     navigate("/");
  //     return;
  //   }
  //   setProgram(userData.program || "");
  // }, [dataExist]);

  return (
    <div className="min-h-screen w-full max-w-[768px] mx-auto bg-gradient-to-br from-[#fdf5f6] via-white to-[#f5eff0]">
      {loading && <Spinner />}

      {/* Form Header */}
      <FormHeader
        title="Enquiry Form"
        subtitle="Complete your course details"
        icon={BookOpen}
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
                Course Selection
              </h2>
              <div className="text-xs sm:text-sm text-gray-600">
                Step 2 of 3
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-[#c61d23] to-[#a01818] h-2 rounded-full transition-all duration-300"
                style={{ width: "66%" }}
              ></div>
            </div>
          </div>

          {/* Form Container */}
          <form
            autoComplete="off"
            onSubmit={onSubmit}
            className="flex flex-col gap-4 sm:gap-5"
          >
            {/* Program */}
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-4 sm:p-5 md:p-6">
              <label
                htmlFor="program"
                className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3"
              >
                <GraduationCap
                  size={16}
                  className="text-[#c61d23] sm:w-[18px] sm:h-[18px]"
                />
                <span className="flex-1">Program</span>
                <span className="text-[#c61d23]">*</span>
              </label>
              <div className="relative">
                <select
                  id="program"
                  name="program"
                  value={userData.program || ""}
                  onChange={handleChange}
                  className="w-full text-sm sm:text-base appearance-none border border-gray-200 rounded-lg p-2.5 sm:p-3 pr-10 focus:ring-2 focus:ring-[#c61d23] focus:border-transparent focus:outline-none transition-all bg-white cursor-pointer"
                >
                  <option value="">Select program</option>
                  {Object.keys(programOptions).map((program) => (
                    <option key={program} value={program}>
                      {program === "Foundation"
                        ? `${program} (VI - X)`
                        : `${program} (XI - XII Passed)`}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={18}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
              {errors.program && (
                <div className="flex items-center gap-2 text-red-500 text-xs mt-2">
                  <AlertCircle size={14} />
                  {errors.program}
                </div>
              )}
            </div>

            {/* Course */}
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-4 sm:p-5 md:p-6">
              <label
                htmlFor="courseOfIntrested"
                className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3"
              >
                <BookOpen
                  size={16}
                  className="text-[#c61d23] sm:w-[18px] sm:h-[18px]"
                />
                <span className="flex-1">Course Interested In</span>
                <span className="text-[#c61d23]">*</span>
              </label>
              <div className="relative">
                <select
                  id="courseOfIntrested"
                  name="courseOfIntrested"
                  value={userData.courseOfIntrested || ""}
                  onChange={handleChange}
                  disabled={!program}
                  className="w-full text-sm sm:text-base appearance-none border border-gray-200 rounded-lg p-2.5 sm:p-3 pr-10 focus:ring-2 focus:ring-[#c61d23] focus:border-transparent focus:outline-none transition-all bg-white cursor-pointer disabled:bg-gray-50 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {program ? "Select course" : "Select program first"}
                  </option>
                  {program &&
                    programOptions[program].map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                </select>
                <ChevronDown
                  size={18}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
              {errors.courseOfIntrested && (
                <div className="flex items-center gap-2 text-red-500 text-xs mt-2">
                  <AlertCircle size={14} />
                  {errors.courseOfIntrested}
                </div>
              )}
            </div>

            {/* School Name */}
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-4 sm:p-5 md:p-6">
              <label
                htmlFor="schoolName"
                className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3"
              >
                <School
                  size={16}
                  className="text-[#c61d23] sm:w-[18px] sm:h-[18px]"
                />
                <span className="flex-1">School Name</span>
                <span className="text-xs text-gray-500 font-normal">
                  (Optional)
                </span>
              </label>
              <input
                type="text"
                id="schoolName"
                name="schoolName"
                value={userData.schoolName || ""}
                onChange={handleChange}
                placeholder="Enter your school name"
                className="w-full text-sm sm:text-base border border-gray-200 rounded-lg p-2.5 sm:p-3 focus:ring-2 focus:ring-[#c61d23] focus:border-transparent focus:outline-none transition-all"
              />
            </div>

            {/* City Selection */}
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-4 sm:p-5 md:p-6">
              <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-900 mb-3">
                <MapPin
                  size={16}
                  className="text-[#c61d23] sm:w-[18px] sm:h-[18px]"
                />
                <span className="flex-1">City</span>
                <span className="text-[#c61d23]">*</span>
              </label>
              <div className="flex gap-4 mb-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="city"
                    value="Moradabad"
                    checked={userData.city === "Moradabad"}
                    onChange={handleChange}
                    className="w-4 h-4 text-[#c61d23] focus:ring-[#c61d23]"
                  />
                  <span className="text-sm text-gray-700">Moradabad</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="city"
                    value="Other"
                    checked={userData.city !== "Moradabad" && otherCity}
                    onChange={handleChange}
                    className="w-4 h-4 text-[#c61d23] focus:ring-[#c61d23]"
                  />
                  <span className="text-sm text-gray-700">Other</span>
                </label>
              </div>

              {otherCity && (
                <input
                  type="text"
                  name="city"
                  value={userData.city || ""}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  className="w-full text-sm sm:text-base border border-gray-200 rounded-lg p-2.5 sm:p-3 focus:ring-2 focus:ring-[#c61d23] focus:border-transparent focus:outline-none transition-all"
                />
              )}

              {errors.city && (
                <div className="flex items-center gap-2 text-red-500 text-xs mt-2">
                  <AlertCircle size={14} />
                  {errors.city}
                </div>
              )}
            </div>

            {/* State (Only if Other City) */}
            {otherCity && (
              <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-4 sm:p-5 md:p-6">
                <label
                  htmlFor="state"
                  className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3"
                >
                  <MapPin
                    size={16}
                    className="text-[#c61d23] sm:w-[18px] sm:h-[18px]"
                  />
                  <span className="flex-1">State</span>
                </label>
                <div className="relative">
                  <select
                    id="state"
                    name="state"
                    value={userData.state || "Uttar Pradesh"}
                    onChange={handleChange}
                    className="w-full text-sm sm:text-base appearance-none border border-gray-200 rounded-lg p-2.5 sm:p-3 pr-10 focus:ring-2 focus:ring-[#c61d23] focus:border-transparent focus:outline-none transition-all bg-white cursor-pointer"
                  >
                    <option value="">Select state</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    {indianStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={18}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>
            )}

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
                onClick={() => navigate("/firstPage")}
                type="button"
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
                <span>{loading ? "Submitting..." : "Next"}</span>
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

export default EnquiryForm;
