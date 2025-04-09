import React from "react";
import LoginSugnupPageImg from "../assets/LoginSugnupPageImg.png";
import { Form } from "react-router-dom";

const FormHeader = () => {
  return (
    <div className="h-full w-full pt-2">
      <div className=" flex flex-col h-full w-full bg-white rounded-2xl px-4 py-4">
            <h3 className=" text-xl font-thin text-[#c61d23]">
              <strong className="font-semibold ">Welcome to</strong>{" "}
              Scholars Den{" "}
            </h3>
            <div className="flex ">

            
        <div className="flex flex-col justify-between w-full text-xs ">
          <div className="">
            <h4 className="text-sm">Please fill your Enquiry Form</h4>
          </div>

          <div className="font-semibold">TRUST . CARE . HONESTY</div>
        </div>
        <div className="flex justify-end ">
          <img className=" w-4/5 " src={LoginSugnupPageImg} alt="Signup" />
        </div>
        
        </div>
      </div>
    </div>
  );
};

export default FormHeader;
