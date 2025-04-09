import React from "react";
import SignupDetailsPage from "./SignupDetailsPage";
import FirstPageContant from "./FirstPageContant";

const FirstPage = () => {
  return (
    <div className="w-full h-full overflow-auto bg-[#c61d23] "
    style= {{ paddingBottom: "4px"}}
    >
      <div className="grid grid-rows-10 w-full  overflow-auto  bg-[#c61d23]">
        <div className="row-span-4">
          <SignupDetailsPage />
        </div>
        <div className="row-span-6 h-full ">
          <FirstPageContant />
        </div>
      </div>
    </div>
  );
};

export default FirstPage;
