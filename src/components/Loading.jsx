import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-600 to-purple-800">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-white"></div>
    </div>
  );
};

export default Loading;
