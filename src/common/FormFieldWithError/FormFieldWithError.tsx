import React from 'react';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { formFieldsMap } from './formFieldsMap';

const style = {
	pageInput: `py-3 px-4 leading-6 rounded border border-[#CFCFCF] focus:outline-[#007298] w-full`,
};
interface ErrorMessages {
	title: string;
	description: string;
	duration: string;
	authors: string;
}
interface InputProps {
	name: string;
	value: string | number;
	errorMessages: ErrorMessages;
	onChange: (e?) => void;
}

export const FormFieldWithError = ({
	name,
	value,
	errorMessages,
	onChange,
}: InputProps) => {
	const config = formFieldsMap[name];

	return (
		<div>
			<label htmlFor={config.inputID} className='font-bold capitalize'>
				{config.labelText}
				<input
					type={config.type}
					id={config.inputID}
					placeholder={config.placeholderText}
					name={config.name}
					value={value}
					className={style.pageInput}
					onChange={onChange}
				/>
			</label>
			<ErrorMessage errorMessage={errorMessages[name]} />
		</div>
	);
};
