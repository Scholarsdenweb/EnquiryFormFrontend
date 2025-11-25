// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import scholarsden from "../assets/scholarsden.png";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUserDetails, updateUserDetails } from "../../redux/formDataSlice";
// import FormHeader from "./FormHeader";
// import scholarsDenLogo from "../assets/scholarsDenLogo.png";
// import axios from "../../api/axios";
// import FooterImg from "./FooterImg";
// import { useRef } from "react";

// const FormSubmitted = () => {
//   const navigate = useNavigate();

//   const [tokenNumber, setTokenNumber] = useState("");

//   const { userData } = useSelector((state) => state.userDetails);

//   const dispatch = useDispatch();

//   const [time, setTime] = useState("");

//   const [timeInMin, setTimeInMin] = useState(5);
//   const [timeInSec, setTimeInSec] = useState(60);
//   const userdata = {
//     studentName: "",
//     studentContactNumber: "",
//     email: "",
//     schoolName: "",
//     program: "",
//     courseOfIntrested: "",
//     fatherContactNumber: "",
//     fatherName: "",
//     fatherOccupations: "",
//     city: "",
//     knowAboutUs: "",
//     remarks: "",
//     intime: "",
//     enquiryTakenBy: "",
//     brochureGiven: "",
//   };

//   const smsSentRef = useRef(false);
//   const clickHandler = async () => {
//     await dispatch(updateUserDetails(userdata));

//     document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
//     navigate("/");
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (timeInSec === 0 && timeInMin === 0) {
//         clearInterval(interval);
//         return;
//       }

//       if (timeInSec === 0) {
//         if (timeInMin > 0) {
//           setTimeInMin((prev) => prev - 1);
//           setTimeInSec(59);
//         }
//       } else {
//         setTimeInSec((prev) => prev - 1);
//       }
//     }, 1000);
//     if (timeInMin === 0 && timeInSec === 0) {
//       setTimeInMin(1);
//       setTimeInSec(59);
//     }

//     return () => clearInterval(interval);
//   }, [timeInMin, timeInSec]);

//   // useEffect(() => {
//   //   document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
//   //   dispatch(updateUserDetails(userdata));

//   //   const interval = setInterval(() => {
//   //     setTime((prev) => {
//   //       if (prev <= 1) {
//   //         clearInterval(interval);
//   //         navigate("/");
//   //         return 0;
//   //       }
//   //       return prev - 1;
//   //     });
//   //   }, 1000);

//   //   return () => clearInterval(interval); // Clean up the interval on component unmount
//   // }, [navigate]);

//   useEffect(() => {
//     const tokenNo = async () => {
//       try {
//         const response = await axios.get("/user/getTokenNo");
//         console.log("response from tokenNo", response);
//         setTokenNumber(response.data.tokenNo);
//       } catch (error) {
//         console.log("error from tokenNo", error);
//       }
//     };

//     console.log("userData from tokenNo", userData);

//     tokenNo();
//     dispatch(fetchUserDetails());

//     console.log("userData from tokenNo", userData);
//   }, []);

//   const smsMessage = async () => {
//     console.log("userData from smsMessage", userData);
//     const data = await axios.post("/user/formSubmit", {
//       phoneNumber: userData.fatherContactNumber,
//     });

//     console.log("data from smsMessage", data);
//   };

//   useEffect(() => {
//     if (userData?.fatherContactNumber && !smsSentRef.current) {
//       smsMessage();
//       smsSentRef.current = true;
//     }
//   }, [userData]);

//   return (
//     <div className="min-h-screen flex flex-col bg-[#c61d23] max-w-[768px]">
//       <div className="w-full bg-[#c61d23] px-4 md:px-8 pt-2 flex flex-col items-center flex-grow">
//         <div className="w-full max-w-5xl flex flex-col gap-6">
//           {/* <div>
//             <FormHeader heading={""} subHeading={""} />
//           </div> */}
//           <div className="flex justify-between mt-2">
//             <img
//               src={scholarsDenLogo}
//               alt="Scholars Den"
//               className="w-10 md:w-14"
//             />
//             <div>
//               <button
//                 className="p-2 rounded-xl hover:bg-[#ffdd00]  bg-white text-lg"
//                 onClick={clickHandler}
//               >
//                 Home
//               </button>
//             </div>
//           </div>

//           <div className="flex flex-col items-center text-white gap-6">
//             <div className="w-full max-w-xl text-green-400 bg-opacity-10 backdrop-blur-sm border border-gray-300 py-8 px-6 md:px-10 rounded-2xl flex flex-col items-center justify-center gap-4 text-center">
//               <p className="text-xl md:text-2xl font-semibold">
//                 Your form has been submitted successfully!
//               </p>
//             </div>

//             <div className=" border-2 px-5 py-7 rounded">
//               <p className="text-xl md:text-2xl font-light">{`Token No. ${tokenNumber}`}</p>
//             </div>

//             <div>
//               Your waiting time is {timeInMin} :{" "}
//               {timeInSec < 10 ? `0${timeInSec}` : timeInSec}
//             </div>
//           </div>
//           <div className="flex flex-col items-center w-full border rounded p-3 ">
//             <div className="flex flex-col items-center text-white ">
//               {` Selected Program :  ${userData?.program}`}
//             </div>
//             <div className="flex  items-center text-white ">
//               Class :{" "}
//               <span className="text-xl px-2 text-gray-300">{`${userData?.courseOfIntrested}`}</span>
//             </div>
//           </div>

//           <div className="flex flex-wrap justify-around items-center mt-2">
//             <div className="w-2/5 px-6 py-4 my-2 rounded bg-[#ffdd00] text-center">
//               <button className=" ">Our Results</button>
//             </div>

//             <div className="w-2/5 px-6 py-4 my-2 rounded bg-[#ffdd00] text-center">
//               <button className="">Faculty</button>
//             </div>

//             <div className="w-2/5 px-6 py-4 my-2 rounded bg-[#ffdd00] text-center">
//               <button className=" ">Fee Structure</button>
//             </div>

//             <div className="w-2/5 px-6 py-4 my-2 rounded bg-[#ffdd00] text-center">
//               <button className=" ">Facilities</button>
//             </div>

//             <div className="w-2/5 px-6 py-4 my-2 rounded bg-[#ffdd00] text-center">
//               <button className=" ">Class Timing</button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="flex-shrink-0 w-full bg-[#ffdd00] ">
//         <div className="flex justify-center items-center">
//           <FooterImg />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FormSubmitted;









import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import scholarsden from "../assets/scholarsden.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails, updateUserDetails } from "../../redux/formDataSlice";
import FormHeader from "./FormHeader";
import scholarsDenLogo from "../assets/scholarsDenLogo.png";
import axios from "../../api/axios";
import FooterImg from "./FooterImg";
import { useRef } from "react";
import {
  CheckCircle,
  Home,
  Clock,
  Ticket,
  BookOpen,
  GraduationCap,
  Award,
  Users,
  DollarSign,
  Building,
  CalendarClock,
} from "lucide-react";

const FormSubmitted = () => {
  const navigate = useNavigate();

  const [tokenNumber, setTokenNumber] = useState("");

  const { userData } = useSelector((state) => state.userDetails);

  const dispatch = useDispatch();

  const [time, setTime] = useState("");

  const [timeInMin, setTimeInMin] = useState(5);
  const [timeInSec, setTimeInSec] = useState(60);
  const userdata = {
    studentName: "",
    studentContactNumber: "",
    email: "",
    schoolName: "",
    program: "",
    courseOfIntrested: "",
    fatherContactNumber: "",
    fatherName: "",
    fatherOccupations: "",
    city: "",
    knowAboutUs: "",
    remarks: "",
    intime: "",
    enquiryTakenBy: "",
    brochureGiven: "",
  };

  const smsSentRef = useRef(false);
  const clickHandler = async () => {
    await dispatch(updateUserDetails(userdata));

    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    navigate("/");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeInSec === 0 && timeInMin === 0) {
        clearInterval(interval);
        return;
      }

      if (timeInSec === 0) {
        if (timeInMin > 0) {
          setTimeInMin((prev) => prev - 1);
          setTimeInSec(59);
        }
      } else {
        setTimeInSec((prev) => prev - 1);
      }
    }, 1000);
    if (timeInMin === 0 && timeInSec === 0) {
      setTimeInMin(1);
      setTimeInSec(59);
    }

    return () => clearInterval(interval);
  }, [timeInMin, timeInSec]);

  useEffect(() => {
    const tokenNo = async () => {
      try {
        const response = await axios.get("/user/getTokenNo");
        console.log("response from tokenNo", response);
        setTokenNumber(response.data.tokenNo);
      } catch (error) {
        console.log("error from tokenNo", error);
      }
    };

    console.log("userData from tokenNo", userData);

    tokenNo();
    dispatch(fetchUserDetails());

    console.log("userData from tokenNo", userData);
  }, []);

  const smsMessage = async () => {
    console.log("userData from smsMessage", userData);
    const data = await axios.post("/user/formSubmit", {
      phoneNumber: userData.fatherContactNumber,
    });

    console.log("data from smsMessage", data);
  };

  useEffect(() => {
    if (userData?.fatherContactNumber && !smsSentRef.current) {
      smsMessage();
      smsSentRef.current = true;
    }
  }, [userData]);

  const quickLinks = [
    { icon: Award, label: "Our Results" },
    { icon: Users, label: "Faculty" },
    { icon: DollarSign, label: "Fee Structure" },
    { icon: Building, label: "Facilities" },
    { icon: CalendarClock, label: "Class Timing" },
  ];

  return (
    <div className="min-h-screen w-full max-w-[768px] mx-auto bg-gradient-to-br from-[#fdf5f6] via-white to-[#f5eff0]">
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-100 shadow-sm">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 md:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-2">
              <img
                src={scholarsDenLogo}
                alt="Scholars Den"
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
              />
              <div>
                <h1 className="text-sm sm:text-base md:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#c61d23] to-[#a01818]">
                  Scholars Den
                </h1>
              </div>
            </div>
            <button
              onClick={clickHandler}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-[#c61d23] to-[#a01818] hover:from-[#b01820] hover:to-[#8f1515] text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-500/30 active:scale-95"
            >
              <Home size={14} className="sm:w-4 sm:h-4" />
              <span>Home</span>
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none max-w-[768px] mx-auto">
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-gradient-to-br from-[#ffdd00]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-gradient-to-tr from-[#c61d23]/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative py-3 sm:py-4 md:py-6">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 md:px-6">
          {/* Success Message */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl border-2 border-green-200 shadow-lg p-4 sm:p-6 mb-4 sm:mb-5">
            <div className="flex flex-col items-center text-center gap-2 sm:gap-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center animate-pulse">
                <CheckCircle size={28} className="text-white sm:w-8 sm:h-8" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1">
                  Form Submitted Successfully!
                </h2>
                <p className="text-sm text-gray-600">
                  Thank you for your interest. Please wait for your turn.
                </p>
              </div>
            </div>
          </div>

          {/* Token Number */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all p-4 sm:p-5 mb-4 sm:mb-5">
            <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
              <Ticket size={18} className="text-[#c61d23] sm:w-5 sm:h-5" />
              <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                Your Token Number
              </h3>
            </div>
            <div className="bg-gradient-to-r from-[#c61d23] to-[#a01818] rounded-xl p-4 sm:p-5 text-center">
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                {tokenNumber || "---"}
              </p>
            </div>
          </div>

          {/* Waiting Time */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all p-4 sm:p-5 mb-4 sm:mb-5">
            <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
              <Clock size={18} className="text-[#c61d23] sm:w-5 sm:h-5" />
              <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                Estimated Waiting Time
              </h3>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-5 text-center border border-blue-200">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                {timeInMin} : {timeInSec < 10 ? `0${timeInSec}` : timeInSec}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                minutes remaining
              </p>
            </div>
          </div>

          {/* Selected Program Details */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all p-4 sm:p-5 mb-4 sm:mb-5">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <GraduationCap
                size={18}
                className="text-[#c61d23] sm:w-5 sm:h-5"
              />
              <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                Your Selection
              </h3>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[#fdf5f6] to-white rounded-lg border border-gray-100">
                <span className="text-xs sm:text-sm font-medium text-gray-600">
                  Program:
                </span>
                <span className="text-xs sm:text-sm font-semibold text-gray-900">
                  {userData?.program || "Not Selected"}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[#fdf5f6] to-white rounded-lg border border-gray-100">
                <span className="text-xs sm:text-sm font-medium text-gray-600">
                  Class:
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {userData?.courseOfIntrested || "Not Selected"}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-lg p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-4 sm:mb-5">
              <BookOpen size={18} className="text-[#c61d23] sm:w-5 sm:h-5" />
              <h3 className="text-base font-semibold text-gray-900">
                Explore More
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              {quickLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <button
                    key={index}
                    className="group relative overflow-hidden bg-gradient-to-br from-gray-50 to-white hover:from-white hover:to-gray-50 border-2 border-gray-200 hover:border-[#c61d23] rounded-lg sm:rounded-xl p-3 sm:p-4 transition-all duration-300 hover:shadow-lg active:scale-95"
                  >
                    <div className="flex flex-col items-center gap-1.5 sm:gap-2 text-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#c61d23]/10 to-[#a01818]/10 group-hover:from-[#c61d23] group-hover:to-[#a01818] rounded-lg flex items-center justify-center transition-all duration-300">
                        <Icon
                          size={20}
                          className="text-[#c61d23] group-hover:text-white transition-colors duration-300 sm:w-6 sm:h-6"
                        />
                      </div>
                      <span className="text-[10px] sm:text-xs font-semibold text-gray-700 group-hover:text-[#c61d23] transition-colors duration-300 leading-tight">
                        {link.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Logo */}
          {/* <div className="flex justify-center items-center py-4 sm:py-6 mt-4 sm:mt-6">
            <img
              className="w-16 sm:w-20 opacity-60 hover:opacity-100 transition-opacity"
              src={scholarsDenLogo}
              alt="Scholars Den Logo"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default FormSubmitted;