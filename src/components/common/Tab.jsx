import React from "react";
import { ACCOUNT_TYPE } from "../../utils/constants";

const Tab = ({ tabData, field, setField }) => {
  

  return (
    <div
      style={{
        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
      }}
      className="flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max"
    >
      {tabData.map((ele, index) => {
        <button
          key={index}
          onClick={() => setField(ele.type)}
          className={`${
            field === ele.type
              ? "bg-richblck-900 text-richblack-5"
              : "bg-transparent text-richblack-200"
          } py-2 px-5 rounded-full transition-all duration-200`}
        >
          {tabData?.tabName}
        </button>;
      })}
    </div>
  );
};

export default Tab;
