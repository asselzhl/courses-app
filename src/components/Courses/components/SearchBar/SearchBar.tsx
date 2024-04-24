import React from 'react';

import { Input } from '../../../../common/Input/Input';
import { Button } from '../../../../common/Button/Button';

export const SearchBar = ({ searchValue, handleSearchInputChange }) => {
	return (
		<div className='flex gap-x-4 w-[50%]'>
			<Input
				type='text'
				labelText=''
				value={searchValue}
				name=''
				placeholderText='Search'
				inputID=''
				onChange={handleSearchInputChange}
			/>
			<Button text='Search' onClick={() => {}} />
		</div>
	);
};
