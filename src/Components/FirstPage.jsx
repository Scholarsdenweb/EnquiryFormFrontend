// import React from "react";
// import SignupDetailsPage from "./SignupDetailsPage";
// import FirstPageContant from "./FirstPageContant";
// import scholarsDenLogo from "../assets/scholarsDenLogo.png";
// import FormHeader from "./FormHeader";
// import { User } from "lucide-react";


// const FirstPage = () => {
//   return (
//     <div className="w-full min-h-full overflow-auto bg-[#c61d23] ">
//       <div className="flex-grow px-4">
//       <FormHeader />
//       </div>
//       <div className="flex-grow">
//         <FirstPageContant />
//       </div>
//       {/* Footer (Logo at Bottom)  */}
//       <div className="flex justify-center items-center py-4">
//         <img className="w-24" src={scholarsDenLogo} alt="Scholars Den Logo" />
//       </div>
//     </div>
//   );



// };


import React from "react";
import FirstPageContant from "./FirstPageContant";
import FormHeader from "./FormHeader";
import { User } from "lucide-react";

const FirstPage = () => {
  return (
    <div className="min-h-screen w-full max-w-[768px] mx-auto bg-gradient-to-br from-[#fdf5f6] via-white to-[#f5eff0]">
      {/* Form Header */}
      <FormHeader 
        title="Enquiry Form" 
        subtitle="Start your journey with us" 
        icon={User}
      />
      
      {/* Decorative Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none max-w-[768px] mx-auto">
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-br from-[#ffdd00]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-tr from-[#c61d23]/5 to-transparent rounded-full blur-3xl"></div>
      </div>
      
      {/* Main Content */}
      <FirstPageContant />
    </div>
  );
};

export default FirstPage;