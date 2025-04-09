import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import scholarsden from "../assets/scholarsden.png";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "../../redux/formDataSlice";
import FormHeader from "./FormHeader";
import scholarsDenLogo from "../assets/scholarsDenLogo.png";
import axios from "../../api/axios";
import FooterImg from "./FooterImg";
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

    console.log("userData from tokenNo", userData);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#c61d23]">
      <div className="w-full bg-[#c61d23] px-4 md:px-8 pt-2 flex flex-col items-center flex-grow">
        <div className="w-full max-w-5xl flex flex-col gap-6">
          {/* <div>
            <FormHeader heading={""} subHeading={""} />
          </div> */}
          <div className="flex mt-2z">
            <img
              src={scholarsDenLogo}
              alt="Scholars Den"
              className="w-10 md:w-14"
            />
          </div>

          <div className="flex flex-col items-center text-white gap-6">
            <div className="w-full max-w-xl text-green-400 bg-opacity-10 backdrop-blur-sm border border-gray-300 py-8 px-6 md:px-10 rounded-2xl flex flex-col items-center justify-center gap-4 text-center">
              <p className="text-xl md:text-2xl font-semibold">
                Your form has been submitted successfully!
              </p>
            </div>

            <div className=" border-2 px-5 py-7 rounded">
              <p className="text-xl md:text-2xl font-light">{`Token No. ${tokenNumber}`}</p>
            </div>

            <div>
              Your waiting time is {timeInMin} :{" "}
              {timeInSec < 10 ? `0${timeInSec}` : timeInSec}
            </div>
          </div>
          <div className="flex flex-col items-center w-full border rounded p-3 "> 
            <div className="flex flex-col items-center text-white ">
              {` Selected Program : ${userData.program}`}
            </div>
            <div className="flex  items-center text-white ">
              Class :  <span className="text-xl px-2 text-gray-300" >{`${userData.courseOfIntrested}`}</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-around items-center mt-2">
            <div className="w-2/5 px-6 py-4 my-2 rounded bg-[#ffdd00] text-center">
              <button className=" ">Our Results</button>
            </div>

            <div className="w-2/5 px-6 py-4 my-2 rounded bg-[#ffdd00] text-center">
              <button className="">Faculty</button>
            </div>

            <div className="w-2/5 px-6 py-4 my-2 rounded bg-[#ffdd00] text-center">
              <button className=" ">Fee Structure</button>
            </div>

            <div className="w-2/5 px-6 py-4 my-2 rounded bg-[#ffdd00] text-center">
              <button className=" ">Facilities</button>
            </div>

            <div className="w-2/5 px-6 py-4 my-2 rounded bg-[#ffdd00] text-center">
              <button className=" ">Class Timing</button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 w-full bg-[#ffdd00] ">
        <div className="flex justify-center items-center">
          <FooterImg />
        </div>
      </div>
    </div>
  );
};

export default FormSubmitted;
