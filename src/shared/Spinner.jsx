import React from "react";

const Spinner = ({ className = "border-purple-600" }) => {
  return (
    <div className="flex justify-center">
      <div
        className={`animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 ${className}`}
      ></div>
    </div>
  );
};

export default Spinner;
