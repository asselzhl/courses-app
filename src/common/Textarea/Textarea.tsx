import React from 'react';

const style = {
	textarea: `py-3 px-4 leading-6 rounded border border-[#CFCFCF] focus:outline-[#007298] w-full`,
};

export const Textarea = ({
	labelText,
	placeholderText,
	textareaID,
	onChange,
}) => {
	return (
		<>
			{labelText && (
				<label htmlFor={textareaID} className='font-bold capitalize'>
					{labelText}
				</label>
			)}
			<textarea
				name=''
				id={textareaID}
				placeholder={placeholderText}
				className={style.textarea}
				onChange={onChange}
			></textarea>
		</>
	);
};
