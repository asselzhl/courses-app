import React from 'react';
import { FormFieldWithError } from '../../../common/FormFieldWithError/FormFieldWithError';
import { TextareaWithError } from '../../../common/TextareaWithError/TextareaWithError';
import { getCourseDuration } from '../../../helpers/getCourseDuration';
import { useDispatch, useSelector } from 'react-redux';
import { getNewCourseData } from '../../../store/selectors';
import { AppDispatch } from '../../../store';
import { setNewCourseData } from '../../../store/slices/newCourse/newCourseSlice';

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

export const CourseDetails = ({
	//   newCourseData,
	errorMessages,
}) => {
	const newCourseData = useSelector(getNewCourseData);
	const dispatch = useDispatch<AppDispatch>();

	const handleNewCourseDataChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		dispatch(setNewCourseData({ [e.target.name]: e.target.value }));
	};

	return (
		<>
			<h3 className={style.sectionSubtitle}>Main Info</h3>

			<FormFieldWithError
				type='text'
				labelText='Title'
				placeholderText='Course Titlte'
				name='title'
				value={newCourseData.title}
				inputID='courseName'
				errorMessage={errorMessages.title}
				onChange={handleNewCourseDataChange}
			/>

			<TextareaWithError
				labelText='Description'
				placeholderText='Description'
				name='description'
				value={newCourseData.description}
				textareaID='description'
				errorMessage={errorMessages.description}
				onChange={handleNewCourseDataChange}
			/>

			<div className={style.durationContainer}>
				<FormFieldWithError
					type='number'
					labelText='Duration'
					placeholderText='Duration'
					name='duration'
					value={newCourseData.duration}
					inputID='duration'
					errorMessage={errorMessages.duration}
					onChange={handleNewCourseDataChange}
				/>

				<p>
					{newCourseData.duration
						? getCourseDuration(newCourseData.duration)
						: '00:00 hours'}
				</p>
			</div>
		</>
	);
};
