import React from 'react';

import { FormFieldWithError } from '../../../../common/FormFieldWithError/FormFieldWithError';
import { Button } from '../../../../common/Button/Button';

export const SearchBar = ({
	searchValue,
	handleSearchInputChange,
	handleSearchButtonClick,
}) => {
	return (
		<form className='flex gap-x-4 w-[50%]' onSubmit={handleSearchButtonClick}>
			<FormFieldWithError
				type='text'
				labelText=''
				value={searchValue}
				name=''
				placeholderText='Search'
				inputID=''
				onChange={handleSearchInputChange}
			/>
			<Button text='Search' onClick={() => {}} />
		</form>
	);
};
