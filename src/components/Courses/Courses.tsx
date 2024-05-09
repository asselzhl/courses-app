import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { EmptyCourseList } from '../EmptyCourseList/EmptyCourseList';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Button } from '../../common/Button/Button';

import { CourseList } from './components/CourseList/CourseList';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/store';
import { fetchCourses } from '../../store/courses/coursesSlice';

const style = {
	coursesListWrapper: `bg-[#F7F7F7] h-full py-20 px-40 flex flex-col gap-y-8`,
	emptyCourseListWrapper: `bg-[#F7F7F7] h-[90vh] py-20 px-40 flex flex-col gap-y-8 justify-center items-center`,
};

export const Courses = () => {
	const [searchValue, setSearchValue] = useState<string>('');
	const dispatch = useDispatch<AppDispatch>();
	// const coursesList = useSelector((state: RootState) => state.courses.data);

	const coursesStatus = useSelector((state: RootState) => state.courses.status);

	useEffect(() => {
		if (coursesStatus === 'idle') {
			dispatch(fetchCourses());
		}
	}, [coursesStatus, dispatch]);

	const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	if (coursesStatus === 'succeeded') {
		// const filteredCourses = coursesList.filter(
		//   (course) =>
		//     course.title.toLowerCase().includes(searchValue.toLowerCase().trim()) ||
		//     course.id.toLowerCase().includes(searchValue.toLowerCase().trim())
		// );
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

					<CourseList />
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
