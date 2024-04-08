import React from 'react';

import Button from '../../common/Button/Button';

const EmptyCourseList = () => {
	return (
		<div className='flex items-center justify-center flex-col'>
			<h2 className='text-[#333E48] font-bold text-3xl mb-6'>
				Your List Is Empty
			</h2>
			<h3 className='text-[#333E48] mb-10'>
				Please use 'Add New Course' button to add your first course
			</h3>
			<Button text='Add new course' />
		</div>
	);
};

export default EmptyCourseList;
