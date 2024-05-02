import React from "react";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";



const style = {
  pageInput: `py-3 px-4 leading-6 rounded border border-[#CFCFCF] focus:outline-[#007298] w-full`,
};

interface InputProps {
  type: string;
  labelText: string;
  placeholderText: string;
  name: string;
  value: string | number;
  inputID: string;
  errorMessage?: string;
  /* eslint-disable */
  onChange: (e?: any) => void;
}

export const FormFieldWithError = ({
  type,
  labelText,
  placeholderText,
  name,
  value,
  inputID,
  errorMessage,
  onChange,
}: InputProps) => {
  return (
    <div>
      <label htmlFor={inputID} className="font-bold capitalize">
        {labelText}
        <input
          type={type}
          id={inputID}
          placeholder={placeholderText}
          name={name}
          value={value}
          className={style.pageInput}
          onChange={onChange}
        />
      </label>
	  <ErrorMessage errorMessage={errorMessage} />
    </div>
  );
};
