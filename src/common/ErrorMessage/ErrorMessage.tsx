import React from 'react';

interface ErrorMessages {
	[key: string]: string;
}

interface ErrorMessageProps {
	errorMessages: ErrorMessages;
	inputField: string;
}

export const ErrorMessage = ({
	errorMessages,
	inputField,
}: ErrorMessageProps) => {
	return (
		<>
			{errorMessages[inputField] ? (
				<p className='text-[#FF0000]'>{errorMessages[inputField]}</p>
			) : null}
		</>
	);
};
