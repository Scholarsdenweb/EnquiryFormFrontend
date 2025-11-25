import React from "react";
import { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";

const Spinner = () => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  return (
    <div className="fixed top-0 right-0 left-0 z-50 bottom-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="fixed inset-0 flex justify-center items-center min-h-screen z-50">
        <BeatLoader
          color="#ffdd00"
          loading
          margin={8}
          size={18}
          speedMultiplier={1}
        />
      </div>
    </div>
  );
};

export default Spinner;
