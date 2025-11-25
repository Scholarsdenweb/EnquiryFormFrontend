// // import React from "react";
// // import LoginSugnupPageImg from "../assets/LoginSugnupPageImg.png";
// // import { Form } from "react-router-dom";
// // import { User } from "lucide-react";

// // const FormHeader = ({ heading = "" }) => {
// //   return (
// //     // <div className="h-full w-full pt-2">
// //     //   <div className=" flex flex-col h-full w-full bg-white rounded-2xl px-2 sm:px-5 py-2">
// //     //     {heading === "" ? (
// //     //       <h3 className=" text-xl sm:text-3xl font-thin text-[#c61d23]">
// //     //         <strong className="font-semibold  ">Welcome to</strong> Scholars Den{" "}
// //     //       </h3>
// //     //     ) : (
// //     //       <h3 className=" text-xl sm:text-3xl font-thin text-[#c61d23]">
// //     //         <strong className="font-semibold  ">{heading}</strong>{" "}
// //     //       </h3>
// //     //     )}
// //     //     <div className="flex">
// //     //       <div className="flex flex-col justify-between w-full text-xs sm:text-lg">
// //     //         <div className="">
// //     //           <h4 className=" ">Please fill your Enquiry Form</h4>
// //     //         </div>

// //     //         <div className="font-semibold">TRUST . CARE . HONESTY</div>
// //     //       </div>
// //     //       <div className="flex justify-end ">
// //     //         <img className=" w-4/5 " src={LoginSugnupPageImg} alt="Signup" />
// //     //       </div>
// //     //     </div>
// //     //   </div>
// //     // </div>




// //   );
// // };

// // export default FormHeader;





// import { useState } from "react";
// import { User, Users, Mail, AlertCircle, ArrowRight } from "lucide-react";

// // FormHeader Component
// const FormHeader = ({ title, subtitle, step, icon: Icon = User }) => {


//   console.log("title, subtitle, step,", title, subtitle, step,)
//   return (
//     <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-100 shadow-sm">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16 sm:h-20">
//           <div className="flex items-center gap-3">
//             <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-[#c61d23] to-[#a01818]">
//               <Icon size={24} className="text-white" />
//             </div>
//             <div>
//               <h1 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#c61d23] to-[#a01818]">
//                 {title}
//               </h1>
//               <p className="text-xs text-gray-500 hidden sm:block">
//                 {subtitle}
//               </p>
//             </div>
//           </div>
//           {step && (
//             <div className="text-xs sm:text-sm text-gray-600 font-medium">
//               Step {step}
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };



// export default FormHeader;








const FormHeader = ({ title, subtitle, icon: Icon }) => {
  return (
    <nav className="sticky top-0 z-10 backdrop-blur-md bg-white/80 border-b border-gray-100 shadow-sm">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center gap-3">
            <div className="flex sm:hidden items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#c61d23] to-[#a01818]">
              {Icon && <Icon size={18} className="text-white" />}
            </div>
            <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-[#c61d23] to-[#a01818]">
              {Icon && <Icon size={24} className="text-white" />}
            </div>
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#c61d23] to-[#a01818]">
                {title}
              </h1>
              {subtitle && (
                <p className="text-xs text-gray-500 hidden sm:block">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default FormHeader;