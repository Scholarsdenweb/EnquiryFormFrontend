import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import scholarsden from "../assets/scholarsden.png";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "../../redux/formDataSlice";
import FormHeader from "./FormHeader";
import scholarsDenLogo from "../assets/scholarsDenLogo.png";
import axios from "../../api/axios";

const FormSubmitted = () => {
  const navigate = useNavigate();

  const [tokenNumber, setTokenNumber] = useState("");

  const {userData} = useSelector((state)=> state.userDetails);

  const dispatch = useDispatch();
  const [time, setTime] = useState(3);
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

  const clickHandler = async () => {
    await dispatch(updateUserDetails(userdata));

    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    navigate("/");
  };

  // useEffect(() => {
  //   document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  //   dispatch(updateUserDetails(userdata));

  //   const interval = setInterval(() => {
  //     setTime((prev) => {
  //       if (prev <= 1) {
  //         clearInterval(interval);
  //         navigate("/");
  //         return 0;
  //       }
  //       return prev - 1;
  //     });
  //   }, 1000);

  //   return () => clearInterval(interval); // Clean up the interval on component unmount
  // }, [navigate]);

  useEffect(() => {
    const tokenNo = async () => {

      try{

        const response = await axios.get("/user/getTokenNo");
        console.log("response from tokenNo", response);
        setTokenNumber(response.data.tokenNo);
      }catch(error){
        console.log("error from tokenNo", error);
      }
    };
    

    console.log("userData from tokenNo", userData);

    tokenNo();
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#c61d23] px-4 py-2 flex flex-col items-center">
      <div className="w-full max-w-5xl flex flex-col gap-6">
        <div>
          <FormHeader />
        </div>

        <div className="flex flex-col items-center text-white gap-6">
          <h1 className="text-2xl md:text-3xl font-light text-center">
            Enquiry Form
          </h1>

          <div className="w-full max-w-xl bg-white bg-opacity-10 backdrop-blur-sm border border-gray-300 py-8 px-6 md:px-10 rounded-2xl flex flex-col items-center justify-center gap-4 text-white text-center">
            <p className="text-xl md:text-2xl font-semibold">
              Your form has been submitted successfully!
            </p>

            <p className="text-xl md:text-2xl font-light">{`Token No. ${tokenNumber}`}</p>

            <p className="text-sm md:text-base text-gray-200">
              Thank you for submission. We have received your details and will get back to you shortly.
            </p>

            {/* Optional: Add a manual go-back button */}
            {/* <button
              onClick={clickHandler}
              className="bg-white text-[#c61d23] font-bold py-2 px-5 rounded-full hover:bg-gray-100 transition"
            >
              Go Back to Home
            </button> */}
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <img src={scholarsDenLogo} alt="Scholars Den" className="w-20 md:w-24" />
        </div>
      </div>
    </div>
  );
};

export default FormSubmitted;
