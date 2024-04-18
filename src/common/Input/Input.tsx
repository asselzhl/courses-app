import React from 'react';

const style = {
	pageInput: `py-3 px-4 leading-6 rounded border border-[#CFCFCF] focus:outline-[#007298] w-full`
};

export const Input = ({
	type,
	labelText,
	placeholderText,
	inputID,
	onChange,
}) => {
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
