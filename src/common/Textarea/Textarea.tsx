import React from 'react';

const style = {
	textarea: `py-3 px-4 leading-6 rounded border border-[#CFCFCF] focus:outline-[#007298] w-full`,
};

export const Textarea = ({
	labelText,
	placeholderText,
	name,
	textareaID,
	onChange,
}) => {
	return (
		<label htmlFor={textareaID} className='font-bold capitalize'>
			{labelText}
			<textarea
				id={textareaID}
				placeholder={placeholderText}
				name={name}
				className={style.textarea}
				onChange={onChange}
			></textarea>
		</label>
	);
};
