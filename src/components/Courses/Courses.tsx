import React from 'react';

import CourseCard from './components/CourseCard/CourseCard';

interface MockedCoursesListInterface {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
}

const Courses = ({ mockedCoursesList, mockedAuthorsList }) => {
	return (
		<div className='bg-[#F7F7F7] h-screen py-20 px-40 flex flex-col gap-y-8'>
			{mockedCoursesList.map((course: MockedCoursesListInterface) => {
				const authors = course.authors.map((authorID) => {
					return mockedAuthorsList.find((author) => {
						return author.id === authorID;
					}).name;
				});

				return (
					<CourseCard
						key={course.id}
						courseName={course.title}
						duration={course.duration}
						creationDate={course.creationDate}
						description={course.description}
						authors={authors}
					/>
				);
			})}
		</div>
	);
};

export default Courses;
