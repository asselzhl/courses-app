import React from 'react';

interface ErrorMessageProps {
	errorMessage: string;
}

export const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
	return (
		<>
			{errorMessage && <span className='text-[#FF0000]'>{errorMessage}</span>}
		</>
	);
};
