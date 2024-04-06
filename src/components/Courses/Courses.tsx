import React from 'react';

import CourseCard from './components/CourseCard/CourseCard';

const Courses = ({ mockedCoursesList }) => {
	return (
		<div className='bg-[#F7F7F7] h-screen py-20 px-40 flex flex-col gap-y-8'>
			{mockedCoursesList.map((course) => {
				return (
					<CourseCard
						courseName={course.title}
						duration={course.duration}
						creationDate={course.creationDate}
						description={course.description}
					/>
				);
			})}
		</div>
	);
};

export default Courses;
