import React from "react";


import Button from "../Button/Button";

const Input = () => {
  return (
    <div className="w-[50%]">
      <form action="" className="flex gap-x-4">
        <input
          type="text"
          name=""
          id=""
          placeholder="Input text"
          className="py-3 px-4 leading-6 rounded border border-[#CFCFCF] focus:outline-[#007298] w-[70%]"
        />
        <Button text='search' />
      </form>
    </div>
  );
};

export default Input;
