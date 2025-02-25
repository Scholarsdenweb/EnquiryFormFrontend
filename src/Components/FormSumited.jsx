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

  useEffect(() => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    dispatch(updateUserDetails(userdata));

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [navigate]);

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
    <div
      className="overflow-auto w-full items-center px-6"
      style={{ backgroundColor: "#c61d23", paddingBottom: "3px" }}
    >
      <div className="grid grid-rows-8 flex-col w-full h-full">
        <div className="row-span-2">
          <FormHeader />
        </div>

        <div className="row-span-5 px-9 rounded-3xl h-full flex flex-col items-center text-white   gap-4 overflow-auto  ">
          <div className="h-1/4 flex justify-center items-center">
            <h1 className="text-3xl font-thin text-center ">Enquiry Form</h1>
          </div>

          <div className="w-2/3 border border-gray-300 py-6 px-9 rounded-2xl flex flex-col  items-center justify-center gap-4">
            <p className="mb-1 text-2xl text-center w-3/4 ">
              Your form has been submitted successfully!
            </p>
            <p className="text-2xl font-extralight text-center">
              {`Token No. ${tokenNumber}`}
            </p>
            <p className="ftext-sm  text-center text-gray-300">
              Thank you for submission. We have recieved your details nd will
              get back you sortly
            </p>
            {/* <p>{`Redirecting to Home in ${time} second${
              time !== 1 ? "s" : ""
            }`}</p> */}
            {/* <button
              onClick={clickHandler}
              className="bg-[#c61d23] text-white font-semibold py-2 px-6 rounded-full hover:bg-[#a31a1d] transition duration-200"
            >
              Go Back to Home
            </button> */}
          </div>
        </div>
        <div className=" row-span-1 w-full flex justify-center">
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

export default FormSubmitted;
