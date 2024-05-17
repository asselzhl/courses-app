import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../../common/Button/Button';
import { useSelector } from 'react-redux';
import { getUserData } from '../../store/selectors';

const style = {
	container: `flex items-center justify-center flex-col`,
	title: `text-[#333E48] font-bold text-3xl mb-6`,
	subtitle: `text-[#333E48] mb-10`,
};

export const EmptyCourseList = () => {
	const userData = useSelector(getUserData);

	return (
		<div className={style.container}>
			<h2 className={style.title}>Your List Is Empty</h2>
			{userData.role === 'admin' ? (
				<AddCoursePrompt />
			) : (
				<span>
					You don't have permissions to create a course. Please log in as ADMIN
				</span>
			)}
		</div>
	);
};

const AddCoursePrompt = () => {
	return (
		<>
			<h3 className={style.subtitle}>
				Please use 'Add New Course' button to add your first course
			</h3>
			<Link to='/courses/add'>
				<Button text='Add new course' onClick={() => {}} />
			</Link>
		</>
	);
};
