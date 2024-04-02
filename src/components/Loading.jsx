import React from "react";
import Spinner from "../shared/Spinner";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-600 to-purple-800">
      <Spinner className="border-white-600" />
    </div>
  );
};

export default Loading;
