import React from 'react';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { formFieldsMap } from '../FormFieldWithError/formFieldsMap';
import { useSelector } from 'react-redux';
import { getErrorMessages } from '../../store/selectors';

const style = {
	textarea: `py-3 px-4 leading-6 rounded border border-[#CFCFCF] focus:outline-[#007298] w-full`,
};

interface TextareaProps {
	name: string;
	value: string;
	onChange: (e?) => void;
}

export const TextareaWithError = ({
	name,
	value,

	onChange,
}: TextareaProps) => {
	const config = formFieldsMap[name];

	const errorMessages = useSelector(getErrorMessages);
	return (
		<div>
			<label htmlFor={config.inputID} className='font-bold capitalize'>
				{config.labelText}
				<textarea
					id={config.inputID}
					placeholder={config.placeholderText}
					name={config.name}
					value={value}
					className={style.textarea}
					onChange={onChange}
				></textarea>
			</label>
			<ErrorMessage errorMessage={errorMessages.description} />
		</div>
	);
};
