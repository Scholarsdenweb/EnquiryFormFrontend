import React from "react";
import LoginSugnupPageImg from "../assets/LoginSugnupPageImg.png";
import { Form } from "react-router-dom";

const FormHeader = () => {
  return (
    <div className="h-full w-full pt-4">
      <div className=" flex h-full w-full bg-white rounded-2xl px-8 py-4">
        <div className="flex flex-col justify-between w-full  ">
          <div className="">
            <h3 className=" text-3xl font-thin text-[#c61d23]">
              <strong className="font-semibold text-3xl">Welcome to</strong>{" "}
              Scholars Den{" "}
            </h3>
            <h4 className="text-sm">Please fill your enquiry form</h4>
          </div>

          <div className="font-semibold">TRUST . CARE . HONESTY</div>
        </div>
        <div className="flex justify-end ">
          <img className=" w-4/5 " src={LoginSugnupPageImg} alt="Signup" />
        </div>
      </div>
    </div>
  );
};

export default FormHeader;
