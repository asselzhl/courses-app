import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { EmptyCourseList } from '../EmptyCourseList/EmptyCourseList';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Button } from '../../common/Button/Button';

import { CourseList } from './components/CourseList/CourseList';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/store';
import { getCoursesData, getUserData } from '../../store/selectors';
import { fetchCourses } from '../../store/operations';

const style = {
	coursesListWrapper: `bg-[#F7F7F7] h-full py-20 px-40 flex flex-col gap-y-8`,
	emptyCourseListWrapper: `bg-[#F7F7F7] h-[90vh] py-20 px-40 flex flex-col gap-y-8 justify-center items-center`,
};

export const Courses = () => {
	// const [searchValue, setSearchValue] = useState<string>("");
	const dispatch = useDispatch<AppDispatch>();

	const coursesData = useSelector(getCoursesData);

	const coursesStatus = coursesData.status;

	const userData = useSelector(getUserData);

	useEffect(() => {
		dispatch(fetchCourses());
	}, [dispatch]);

	// useEffect(() => {
	//   dispatch(searchCourse(searchValue));
	// }, [coursesList, dispatch]);

	// const handleSearchButtonClick = (e: React.FormEvent<HTMLFormElement>) => {
	//   e.preventDefault();
	//   dispatch(searchCourse(searchValue));
	// };

	if (coursesStatus === 'succeeded') {
		return (
			<>
				<div className={style.coursesListWrapper}>
					<div className='flex justify-between'>
						<SearchBar />
						{userData.role === 'admin' ? (
							<Link to='/courses/add'>
								<Button text='Add new course' onClick={() => {}} />
							</Link>
						) : null}
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
