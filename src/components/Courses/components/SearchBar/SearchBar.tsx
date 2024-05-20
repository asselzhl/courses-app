import React from 'react';

import { FormFieldWithError } from '../../../../common/FormFieldWithError/FormFieldWithError';
import { Button } from '../../../../common/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getFilterValue } from '../../../../store/selectors';
import { setFilterValue } from '../../../../store/slices/filter/filterSlice';

export const SearchBar = () => {
	const filterValue = useSelector(getFilterValue);
	const dispatch = useDispatch();

	const handleSearchInputChange = ({ target: { value } }) => {
		dispatch(setFilterValue(value));
	};
	return (
		<form className='flex gap-x-4 w-[50%]'>
			<FormFieldWithError
				type='text'
				labelText=''
				value={filterValue}
				name=''
				placeholderText='Search'
				inputID=''
				onChange={handleSearchInputChange}
			/>
			<Button type='submit' text='Search' onClick={() => {}} />
		</form>
	);
};
