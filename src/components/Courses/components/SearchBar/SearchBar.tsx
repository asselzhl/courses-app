import React from 'react';

import { Input } from '../../../../common/Input/Input';
import { Button } from '../../../../common/Button/Button';

export const SearchBar = () => {
	return (
		<div className='flex gap-x-4 w-[50%]'>
			<Input
				type='text'
				labelText=''
				placeholderText='Input text'
				inputID=''
				onChange={() => {}}
			/>
			<Button text='Search' onClick={() => {}} />
		</div>
	);
};
