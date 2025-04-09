import React, { useEffect } from 'react';

const LoadingPage = () => {

  return (
    <div className="fixed z-10 top-0 bottom-0 right-0 left-0 flex flex-col items-center justify-center h-screen bg-white text-gray-800">
      <div className="text-2xl font-semibold mb-4 animate-pulse">
        Redirecting you to the Enquiry Form...
      </div>
      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingPage;
