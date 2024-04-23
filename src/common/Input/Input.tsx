import React from "react";

const style = {
  pageInput: `py-3 px-4 leading-6 rounded border border-[#CFCFCF] focus:outline-[#007298] w-full`,
};

interface InputProps {
	type: string;
	labelText: string;
	placeholderText: string;
	inputID: string;
	onChange: () => void;
}

export const Input = ({
  type,
  labelText,
  placeholderText,
  name,
  value,
  inputID,
  onChange,
}) => {
  return (
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
  );
	type,
	labelText,
	placeholderText,
	inputID,
	onChange,
}: InputProps) => {
	return (
		<>
			{labelText && <label htmlFor={inputID}>{labelText}</label>}
			<input
				type={type}
				id={inputID}
				placeholder={placeholderText}
				className={style.pageInput}
				onChange={onChange}
			/>
		</>
	);
};
