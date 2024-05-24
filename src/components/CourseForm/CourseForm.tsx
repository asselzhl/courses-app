import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/store';

import { CourseDetails } from './CourseDetails/CourseDetails';
import { CourseAuthors } from './CourseAuthors/CourseAuthors';
import { ActionButtons } from './ActionButtons/ActionButtons';

import { validateInputValues } from '../../helpers/validateInputValues';
import { getCoursesList, getCourseFormData } from '../../store/selectors';
import { routePaths } from '../../routePaths';

import {
	clearCourseFormData,
	setCourseFormData,
} from '../../store/slices/courseForm/courseFormSlice';
import { setErrorMessages } from '../../store/slices/errorMessages/errorMessagesSlice';
import { addCourse, updateCourse } from '../../store/thunks/coursesThunk';

const style = {
	sectionTitle: `text-[#333E48] font-bold text-3xl mb-6 capitalize`,
	section: `border-[#CFCFCF] border bg-white rounded py-10 px-20 flex flex-col gap-y-8 mb-8`,
	sectionSubtitle: `text-2xl font-bold`,
	errorMessage: `text-[#FF0000]`,
	durationContainer: `flex items-center gap-x-4`,
	availableAuthorsTitle: `text-2xl font-bold mb-6`,
	newCourseAuthorsContainer: `max-w-[20%] flex flex-col gap-y-4 text-center`,
	createCourseWrapper: `bg-[#F7F7F7] h-full py-20 px-40 flex flex-col`,
};

export const CourseForm = () => {
	const { courseId } = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const courseFormData = useSelector(getCourseFormData);
	const coursesList = useSelector(getCoursesList);

	useEffect(() => {
		if (location.pathname === routePaths.addCourse) {
			dispatch(clearCourseFormData());
		} else if (courseId) {
			const course = coursesList.find((course) => course.id === courseId);
			if (course) {
				const { title, description, duration, authors } = course;
				dispatch(setCourseFormData({ title, description, duration, authors }));
			}
		}
	}, [courseId, coursesList, location.pathname, dispatch]);

	const handleFormSubmit = (e) => {
		e.preventDefault();

		const errors = validateInputValues(courseFormData, {});
		dispatch(setErrorMessages(errors));

		if (Object.keys(errors).length === 0) {
			if (location.pathname === routePaths.addCourse) {
				dispatch(addCourse(courseFormData));
			} else {
				const courseData = {
					courseFormData: courseFormData,
					courseId: courseId,
				};

				dispatch(updateCourse(courseData));
			}

			navigate(routePaths.courses);
		}
	};

	return (
		<div className={style.createCourseWrapper}>
			<h2 className={style.sectionTitle}>Course edit/create page</h2>

			<form action='' onSubmit={handleFormSubmit}>
				<div className={style.section}>
					<CourseDetails />
					<CourseAuthors />
				</div>

				<ActionButtons />
			</form>
		</div>
	);
};
