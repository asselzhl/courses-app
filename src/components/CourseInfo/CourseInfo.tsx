import React, { useEffect } from 'react';

import { Button } from '../../common/Button/Button';
import { useNavigate, useParams } from 'react-router-dom';

import { convertDateToDotFormat } from '../../helpers/convertDateToDotFormat';
import { getCourseDuration } from '../../helpers/getCourseDuration';
import { getAuthorsName } from '../../helpers/getAuthorsName';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';

import { fetchCourses, fetchAuthors } from '../../store/operations';
import { getAuthorsData, getCoursesData } from '../../store/selectors';

const style = {
	title: `text-[#333E48] font-bold text-3xl mb-6`,
	body: `border-[#CFCFCF] border bg-white py-14 px-16 rounded mb-12`,
	subtitle: `text-[#333E48] text-xl font-bold mb-6`,
	line: `w-[1px] bg-[#CFCFCF]`,
	info: `w-[50%] flex flex-col gap-y-4`,
	content: `flex gap-x-8`,
	infoText: `flex justify-between text-[#333E48]`,
	courseInfoWrapper: `bg-[#F7F7F7] h-screen py-20 px-40 flex flex-col gap-y-8`,
};

export const CourseInfo = () => {
	const { courseId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const coursesData = useSelector(getCoursesData);

	const coursesList = coursesData.data;

	const authorsData = useSelector(getAuthorsData);
	const authorsList = authorsData.data;

	const coursesStatus = coursesData.status;
	const authorsStatus = authorsData.status;

	useEffect(() => {
		if (coursesStatus === 'idle' && authorsStatus === 'idle') {
			dispatch(fetchCourses());
			dispatch(fetchAuthors());
		}
	}, [coursesStatus, authorsStatus, dispatch]);

	const handleButtonClick = () => {
		navigate('/courses');
	};
	if (coursesStatus === 'succeeded' && authorsStatus === 'succeeded') {
		const course = coursesList.find((course) => course.id === courseId);
		const courseDuration = course ? getCourseDuration(course.duration) : '';
		const courseCreationDate = course
			? convertDateToDotFormat(course.creationDate)
			: '';
		const courseAuthors = course
			? getAuthorsName(course.authors, authorsList)
			: '';

		const config = [
			{ title: 'ID:', value: course ? course.id : '' },
			{ title: 'Duration:', value: courseDuration },
			{ title: 'Created:', value: courseCreationDate },
			{ title: 'Authors:', value: courseAuthors },
		];

		return (
			<div className={style.courseInfoWrapper}>
				<h2 className={style.title}>{course.title}</h2>
				<div className={style.body}>
					<h3 className={style.subtitle}>Description:</h3>
					<div className={style.content}>
						<div className='w-[50%]'>
							<p>{course.description}</p>
						</div>
						<div className={style.line}></div>
						<div className={style.info}>
							{config.map((infoItem, index) => (
								<p className={style.infoText} key={index}>
									<span className='font-bold'>{infoItem.title}</span>
									<span>{infoItem.value}</span>
								</p>
							))}
						</div>
					</div>
				</div>
				<div className='text-right'>
					<Button text='back' onClick={handleButtonClick} />
				</div>
			</div>
		);
	}
};
