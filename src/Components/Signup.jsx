import React from "react";
import SignupForm from "./SignupForm";
import SignupDetailsPage from "./SignupDetailsPage";
import scholarsDenLogo from "../assets/scholarsDenLogo.png";
import FormHeader from "./FormHeader";
import { GraduationCap, Phone } from "lucide-react";
import SignupHeader from "./SignupHeader";

const Signup = () => {
  return (
    <div className="min-h-screen w-full max-w-[768px] mx-auto bg-gradient-to-br from-[#fdf5f6] via-white to-[#f5eff0]">
      <SignupHeader />

      {/* Decorative Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none max-w-[768px] mx-auto">
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-br from-[#ffdd00]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-tr from-[#c61d23]/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Signup Form */}
      <SignupForm />

      {/* Footer Logo */}
      {/* <div className="flex justify-center items-center py-6 sm:py-8">
        <img
          className="w-20 sm:w-24 opacity-60 hover:opacity-100 transition-opacity"
          src={scholarsDenLogo}
          alt="Scholars Den Logo"
        />
      </div> */}
    </div>
  );
};

export default Signup;
