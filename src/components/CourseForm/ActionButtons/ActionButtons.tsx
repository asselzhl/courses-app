import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { routePaths } from '../../../routePaths';
import { Button } from '../../../common/Button/Button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { clearCourseFormData } from '../../../store/slices/courseForm/courseFormSlice';

export const ActionButtons = () => {
	const location = useLocation();
	const dispatch = useDispatch<AppDispatch>();
	return (
		<div className='flex gap-x-5 justify-end'>
			<Link to={routePaths.courses}>
				<Button
					text='cancel'
					onClick={() => {
						dispatch(clearCourseFormData());
					}}
				/>
			</Link>
			<Button
				type='submit'
				text={
					location.pathname === routePaths.addCourse
						? 'create course'
						: 'update course'
				}
				onClick={() => {}}
			/>
		</div>
	);
};
