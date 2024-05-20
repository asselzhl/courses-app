import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/store';

import { Button } from '../../common/Button/Button';
import { CourseDetails } from './CourseDetails/CourseDetails';
import { CourseAuthors } from './CourseAuthors/CourseAuthors';

import { validateInputValues } from '../../helpers/validateInputValues';
import {
	addAuthor,
	fetchAuthors,
	addCourse,
	updateCourse,
} from '../../store/thunks';
import {
	getAuthorsStateStatus,
	getAuthorsList,
	getCoursesList,
	getNewCourseData,
	getNewCourseAuthors,
} from '../../store/selectors';
import { routePaths } from '../../routePaths';
import { stateStatus } from '../../store/slices/constants';
import { setNewCourseData } from '../../store/slices/newCourse/newCourseSlice';
import { setNewCourseAuthors } from '../../store/slices/newCourseAuthors/newCourseAuthorsSlice';

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

interface ErrorMessages {
	[key: string]: string;
}

export const CreateCourse = () => {
	const { courseId } = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const coursesList = useSelector(getCoursesList);

	const authorsList = useSelector(getAuthorsList);
	const authorsStatus = useSelector(getAuthorsStateStatus);

	const newCourseData = useSelector(getNewCourseData);
	const newCourseAuthors = useSelector(getNewCourseAuthors);

	//   const [newCourseAuthors, setNewCourseAuthors] = useState<AuthorsListItem[]>(
	//     []
	//   );
	const [newAuthor, setNewAuthor] = useState<string>('');
	const [errorMessages, setErrorMessages] = useState<ErrorMessages>({});

	useEffect(() => {
		if (authorsStatus === stateStatus.idle) {
			dispatch(fetchAuthors());
		}
	}, [authorsStatus, dispatch]);

	useEffect(() => {
		if (courseId) {
			const course = coursesList.find((course) => course.id === courseId);
			dispatch(setNewCourseData(course));
			const courseAuthors = course.authors.map((authorID) => {
				const author = authorsList.find((author) => author.id === authorID);
				return { id: authorID, name: author.name };
			});
			dispatch(setNewCourseAuthors(courseAuthors));
		}
	}, [courseId, coursesList, authorsList]);

	const addAuthorName = (authorID: string) => {
		const author = authorsList.find((author) => author.id === authorID);
		dispatch(setNewCourseAuthors(author));
		// dispatch(setNewCourseData(newCourseAuthors));
	};

	const deleteAuthorName = (authorID) => {
		const updatedAuthors = newCourseAuthors.filter(
			(author) => author.id !== authorID
		);
		dispatch(setNewCourseAuthors(updatedAuthors));
	};

	const createNewAuthor = () => {
		dispatch(addAuthor({ name: newAuthor }));
		setNewAuthor('');
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		const errors = validateInputValues(newCourseData, {});
		setErrorMessages(errors);
		if (Object.keys(errors).length === 0) {
			newCourseData.duration = Number(newCourseData.duration);
			if (location.pathname === routePaths.addCourse) {
				dispatch(addCourse(newCourseData));
			} else {
				const courseData = {
					newCourseData: newCourseData,
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
					<CourseDetails errorMessages={errorMessages} />
					<CourseAuthors
						newAuthor={newAuthor}
						setNewAuthor={setNewAuthor}
						createNewAuthor={createNewAuthor}
						addAuthorName={addAuthorName}
						newCourseAuthors={newCourseAuthors}
						deleteAuthorName={deleteAuthorName}
						errorMessages={errorMessages}
					/>
				</div>

				<div className='flex gap-x-5 justify-end'>
					<Link to={routePaths.courses}>
						<Button text='cancel' onClick={() => {}} />
					</Link>
					{location.pathname === routePaths.addCourse ? (
						<Button type='submit' text='create course' onClick={() => {}} />
					) : (
						<Button type='submit' text='update course' onClick={() => {}} />
					)}
				</div>
			</form>
		</div>
	);
};
