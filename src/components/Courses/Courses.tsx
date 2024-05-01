import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { CourseCard } from './components/CourseCard/CourseCard';
import { EmptyCourseList } from '../EmptyCourseList/EmptyCourseList';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Button } from '../../common/Button/Button';

import { convertDateToDotFormat } from '../../helpers/convertDateToDotFormat';
import { getCourseDuration } from '../../helpers/getCourseDuration';
import { getAuthorsName } from '../../helpers/getAuthorsName';

const style = {
	coursesListWrapper: `bg-[#F7F7F7] h-full py-20 px-40 flex flex-col gap-y-8`,
	emptyCourseListWrapper: `bg-[#F7F7F7] h-[90vh] py-20 px-40 flex flex-col gap-y-8 justify-center items-center`,
};

interface AuthorsListItem {
	id: string;
	name: string;
}
interface CoursesListItem {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
}
interface CoursesProps {
	authorsList: AuthorsListItem[];
	coursesList: CoursesListItem[];
}

export const Courses = ({ authorsList, coursesList }: CoursesProps) => {
	const [searchValue, setSearchValue] = useState<string>('');

	const filteredCourses = coursesList.filter(
		(course) =>
			course.title.toLowerCase().includes(searchValue.toLowerCase().trim()) ||
			course.id.toLowerCase().includes(searchValue.toLowerCase().trim())
	);

	const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	if (coursesList.length) {
		return (
			<>
				<div className={style.coursesListWrapper}>
					<div className='flex justify-between'>
						<SearchBar
							searchValue={searchValue}
							handleSearchInputChange={handleSearchInputChange}
						/>
						<Link to='/courses/add'>
							<Button text='Add new course' onClick={() => {}} />
						</Link>
					</div>

					{filteredCourses.map((course) => {
						const authors = getAuthorsName(course.authors, authorsList);
						const creationDate = convertDateToDotFormat(course.creationDate);
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
							/>
						);
					})}
				</div>
			</>
		);
	}

	return (
		<>
			<div className={style.emptyCourseListWrapper}>
				<EmptyCourseList />
			</div>
		</>
	);
};
