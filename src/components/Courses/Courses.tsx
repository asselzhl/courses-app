import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { EmptyCourseList } from '../EmptyCourseList/EmptyCourseList';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Button } from '../../common/Button/Button';

import { CourseList } from './components/CourseList/CourseList';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/store';
import {
	getCoursesStateStatus,
	getCurrentUserRole,
} from '../../store/selectors';
import { routePaths } from '../../routePaths';
import { stateStatus, userRoles } from '../../store/slices/constants';
import { fetchCourses } from '../../store/thunks/coursesThunk';

const style = {
	coursesListWrapper: `bg-[#F7F7F7] h-full py-20 px-40 flex flex-col gap-y-8`,
	emptyCourseListWrapper: `bg-[#F7F7F7] h-[90vh] py-20 px-40 flex flex-col gap-y-8 justify-center items-center`,
	searchBarWrapper: `flex justify-between`,
};

export const Courses = () => {
	const dispatch = useDispatch<AppDispatch>();

	const coursesStatus = useSelector(getCoursesStateStatus);
	const currentUserRole = useSelector(getCurrentUserRole);

	useEffect(() => {
		if (coursesStatus === stateStatus.idle) {
			dispatch(fetchCourses());
		}
	}, [dispatch]);

	if (coursesStatus === stateStatus.succeeded) {
		return (
			<>
				<div className={style.coursesListWrapper}>
					<div className={style.searchBarWrapper}>
						<SearchBar />
						{currentUserRole === userRoles.admin ? (
							<Link to={routePaths.addCourse}>
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
