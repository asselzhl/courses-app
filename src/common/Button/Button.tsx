import React from "react";

const Button = ({ text, onClick }) => {
  return (
    <div>
      <button
        className="uppercase bg-[#007298] text-white rounded py-[13px] px-9"
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
