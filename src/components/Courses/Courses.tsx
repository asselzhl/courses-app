import React, { useState } from 'react';

import CourseCard from './components/CourseCard/CourseCard';
import EmptyCourseList from '../EmptyCourseList/EmptyCourseList';
import CourseInfo from '../CourseInfo/CourseInfo';

import { formatDate } from '../../helpers/formatCreationDate';
import { getCourseDuration } from '../../helpers/getCourseDuration';
import { getAuthorsName } from '../../helpers/getAuthorsName';

const style = {
	coursesListWrapper: `bg-[#F7F7F7] h-full py-20 px-40 flex flex-col gap-y-8`,
	emptyCourseListWrapper: `bg-[#F7F7F7] h-[90vh] py-20 px-40 flex flex-col gap-y-8 justify-center items-center`,
	courseInfoWrapper: `bg-[#F7F7F7] h-screen py-20 px-40 flex flex-col gap-y-8`,
};

interface MockedCoursesListInterface {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
}

const Courses = ({ mockedCoursesList, mockedAuthorsList }) => {
	const [showCourseInfo, setShowCourseInfo] = useState(false);
	const [courseInfo, setCourseInfo] = useState(null);

	const toggleCourseInfo = () => {
		setShowCourseInfo(!showCourseInfo);
	};

	const getCourseInfo = function (courseID) {
		const info = mockedCoursesList.find((course) => course.id === courseID);
		setCourseInfo(info);
	};

	if (showCourseInfo && courseInfo) {
		return (
			<div className={style.courseInfoWrapper}>
				<CourseInfo
					courseName={courseInfo.title}
					description={courseInfo.description}
					id={courseInfo.id}
					duration={getCourseDuration(courseInfo.duration)}
					creationDate={formatDate(courseInfo.creationDate)}
					authors={getAuthorsName(courseInfo.authors, mockedAuthorsList)}
					toggleCourseInfo={toggleCourseInfo}
				/>
			</div>
		);
	}

	if (mockedCoursesList.length && !showCourseInfo) {
		return (
			<div className={style.coursesListWrapper}>
				{mockedCoursesList.map((course: MockedCoursesListInterface) => {
					const authors = getAuthorsName(course.authors, mockedAuthorsList);
					const creationDate = formatDate(course.creationDate);
					const duration = getCourseDuration(course.duration);

					return (
						<CourseCard
							key={course.id}
							id={course.id}
							courseName={course.title}
							duration={duration}
							creationDate={creationDate}
							description={course.description}
							authors={authors}
							toggleCourseInfo={toggleCourseInfo}
							getCourseInfo={getCourseInfo}
						/>
					);
				})}
			</div>
		);
	}

	return (
		<div className={style.emptyCourseListWrapper}>
			<EmptyCourseList />
		</div>
	);
};

export default Courses;
