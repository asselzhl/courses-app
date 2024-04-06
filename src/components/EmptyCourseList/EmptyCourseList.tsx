import React from 'react';

import Button from '../../common/Button/Button';

const EmptyCourseList = () => {
	return (
		<div>
			<h2>Your List Is Empty</h2>
			<h3>Please use ’Add New Course’ button to add your first course</h3>
			<Button text='Add new course' />
		</div>
	);
};

export default EmptyCourseList;
