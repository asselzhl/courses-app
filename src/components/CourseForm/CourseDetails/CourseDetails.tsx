import React from 'react';
import { FormFieldWithError } from '../../../common/FormFieldWithError/FormFieldWithError';
import { TextareaWithError } from '../../../common/TextareaWithError/TextareaWithError';
import { getCourseDuration } from '../../../helpers/getCourseDuration';
import { useDispatch, useSelector } from 'react-redux';
import { getErrorMessages, getCourseFormData } from '../../../store/selectors';
import { AppDispatch } from '../../../store';
import { setCourseFormData } from '../../../store/slices/courseForm/courseFormSlice';

const style = {
	sectionSubtitle: `text-2xl font-bold`,
	durationContainer: `flex items-center gap-x-4`,
};

export const CourseDetails = () => {
	const courseFormData = useSelector(getCourseFormData);
	const errorMessages = useSelector(getErrorMessages);
	const dispatch = useDispatch<AppDispatch>();

	const courseDuration = getCourseDuration(courseFormData.duration);

	const handleCourseFormDataChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		dispatch(setCourseFormData({ [e.target.name]: e.target.value }));
	};

	return (
		<>
			<h3 className={style.sectionSubtitle}>Main Info</h3>

			<FormFieldWithError
				type='text'
				labelText='Title'
				placeholderText='Course Title'
				name='title'
				value={courseFormData.title}
				inputID='courseName'
				errorMessage={errorMessages.title}
				onChange={handleCourseFormDataChange}
			/>

			<TextareaWithError
				labelText='Description'
				placeholderText='Description'
				name='description'
				value={courseFormData.description}
				textareaID='description'
				errorMessage={errorMessages.description}
				onChange={handleCourseFormDataChange}
			/>

			<div className={style.durationContainer}>
				<FormFieldWithError
					type='number'
					labelText='Duration'
					placeholderText='Duration'
					name='duration'
					value={courseFormData.duration}
					inputID='duration'
					errorMessage={errorMessages.duration}
					onChange={handleCourseFormDataChange}
				/>

				<p>{courseDuration}</p>
			</div>
		</>
	);
};
