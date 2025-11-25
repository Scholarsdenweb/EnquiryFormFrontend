import React from "react";
import LoginSugnupPageImg from "../assets/LoginSugnupPageImg.png";
import { Form } from "react-router-dom";
import { User } from "lucide-react";

const SignupHeader = ({ heading = "" }) => {
  return (
    <div className="h-full w-full pt-4 p-6">
      <div className=" flex flex-col h-full w-full bg-white rounded-2xl px-2 sm:px-5 py-2">
        {heading === "" ? (
          <h3 className=" text-xl sm:text-3xl font-thin text-[#c61d23]">
            <strong className="font-semibold  ">Welcome to</strong> Scholars Den{" "}
          </h3>
        ) : (
          <h3 className=" text-xl sm:text-3xl font-thin text-[#c61d23]">
            <strong className="font-semibold  ">{heading}</strong>{" "}
          </h3>
        )}
        <div className="flex">
          <div className="flex flex-col justify-between w-full text-xs sm:text-lg">
            <div className="">
              <h4 className=" ">Please fill your Enquiry Form</h4>
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





// const SignupHeader = ({ heading = "" }) => {
//   return (
//     <div className="relative mb-8">
//       {/* Header Image with Overlay */}
//       <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
//         <div className="absolute inset-0 bg-[#c61d23]"></div>
//         <div className="absolute inset-0 "></div>
        
//         {/* Decorative Elements */}
//         <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        
//         {/* Content */}
//         <div className="relative h-full flex flex-col items-center justify-center text-white px-6">
//           <div className="mb-4">
//             <User className="w-16 h-16 text-white/90" strokeWidth={1.5} />
//           </div>
          
//           {heading === "" ? (
//             <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">
//               Welcome to <span className="text-yellow-300">Scholars Den</span>
//             </h1>
//           ) : (
//             <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">
//               {heading}
//             </h1>
//           )}
          
//           <p className="text-lg text-white/90 mb-4">Please fill your Enquiry Form</p>
          
//           <div className="flex gap-4 text-sm font-medium">
//             <span className="px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full">TRUST</span>
//             <span className="px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full">CARE</span>
//             <span className="px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full">HONESTY</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };





export default SignupHeader;
