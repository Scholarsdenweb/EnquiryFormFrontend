import React from "react";
import SignupDetailsPage from "./SignupDetailsPage";
import FirstPageContant from "./FirstPageContant";
import scholarsDenLogo from "../assets/scholarsDenLogo.png";
import FormHeader from "./FormHeader";


const FirstPage = () => {
  return (
    <div className="w-full min-h-full overflow-auto bg-[#c61d23] ">
      <div className="flex-grow px-4">
      <FormHeader />
      </div>
      <div className="flex-grow">
        <FirstPageContant />
      </div>
      {/* Footer (Logo at Bottom) */}
      <div className="flex justify-center items-center py-4">
        <img className="w-24" src={scholarsDenLogo} alt="Scholars Den Logo" />
      </div>
    </div>
  );
};

export default FirstPage;
