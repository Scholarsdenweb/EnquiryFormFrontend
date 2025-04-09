import React from "react";
import SDATImg from "../assets/SDATImg.png";

const FooterImg = () => {
  return (
    <div className="flex w-full h-40 bg-[#ffdd00] rounded-2xl justify-between items-center">
      <div className="flex w-3/4 h-full">
        <img src={SDATImg} alt="SDAT Image" className="h-full rounded   " />
      </div>
      <div className="flex items-center mx-2">
        <button className="bg-white text-black py-2 px-1  rounded-xl">
          Click for SDAT Registration
        </button>
      </div>
    </div>
  );
};

export default FooterImg;
