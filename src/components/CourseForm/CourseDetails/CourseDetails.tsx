import React from 'react';
import { FormFieldWithError } from '../../../common/FormFieldWithError/FormFieldWithError';
import { TextareaWithError } from '../../../common/TextareaWithError/TextareaWithError';
import { getCourseDuration } from '../../../helpers/getCourseDuration';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseFormData } from '../../../store/selectors';
import { AppDispatch } from '../../../store';
import { setCourseFormData } from '../../../store/slices/courseForm/courseFormSlice';
import { formFieldsMap } from '../../../common/FormFieldWithError/formFieldsMap';

const style = {
	sectionSubtitle: `text-2xl font-bold`,
	durationContainer: `flex items-center gap-x-4`,
};

export const CourseDetails = () => {
	const courseFormData = useSelector(getCourseFormData);
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
				name={formFieldsMap.title.name}
				value={courseFormData.title}
				onChange={handleCourseFormDataChange}
			/>

			<TextareaWithError
				name={formFieldsMap.description.name}
				value={courseFormData.description}
				onChange={handleCourseFormDataChange}
			/>

			<div className={style.durationContainer}>
				<FormFieldWithError
					name={formFieldsMap.duration.name}
					value={courseFormData.duration}
					onChange={handleCourseFormDataChange}
				/>

				<p>{courseDuration}</p>
			</div>
		</>
	);
};
