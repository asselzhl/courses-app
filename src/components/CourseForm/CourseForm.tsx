import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/store';

import { FormFieldWithError } from '../../common/FormFieldWithError/FormFieldWithError';
import { Button } from '../../common/Button/Button';
import { TextareaWithError } from '../../common/TextareaWithError/TextareaWithError';
import { ErrorMessage } from '../../common/ErrorMessage/ErrorMessage';
import { AuthorItem } from './AuthorItem/AuthorItem';

import { getCourseDuration } from '../../helpers/getCourseDuration';
import { validateInputValues } from '../../helpers/validateInputValues';
import {
	addAuthor,
	fetchAuthors,
	addCourse,
	updateCourse,
} from '../../store/operations';
import { getAuthorsData, getCoursesData } from '../../store/selectors';

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

interface CoursesListItem {
	title: string;
	description: string;
	duration;
	authors: string[];
}
interface AuthorsListItem {
	id: string;
	name: string;
}

export const CreateCourse = () => {
	const { courseId } = useParams();
	const location = useLocation();

	const navigate = useNavigate();

	const coursesData = useSelector(getCoursesData);
	const coursesList = coursesData.data;

	const authorsData = useSelector(getAuthorsData);
	const authorsList = authorsData.data;
	const authorsStatus = authorsData.status;

	const dispatch = useDispatch<AppDispatch>();

	const initialNewCourseData: CoursesListItem = {
		title: '',
		description: '',
		duration: '',
		authors: [],
	};

	let courseAuthorsData: AuthorsListItem[] = [];
	if (courseId) {
		const course = coursesList.find((course) => course.id === courseId);
		initialNewCourseData.title = course.title;
		initialNewCourseData.description = course.description;
		initialNewCourseData.duration = course.duration;
		initialNewCourseData.authors = course.authors;

		courseAuthorsData = initialNewCourseData.authors.map((authorID) => {
			const authorName = authorsList.find(
				(authorData) => authorData.id === authorID
			).name;
			return { id: authorID, name: authorName };
		});
	}

	useEffect(() => {
		if (authorsStatus === 'idle') {
			dispatch(fetchAuthors());
		}
	}, [authorsStatus, dispatch]);

	useEffect(() => {
		dispatch(fetchAuthors());
	}, [authorsList, dispatch]);

	const [newCourseAuthors, setNewCourseAuthors] =
		useState<AuthorsListItem[]>(courseAuthorsData);

	const [newAuthor, setNewAuthor] = useState<string>('');

	const [newCourseData, setNewCourseData] =
		useState<CoursesListItem>(initialNewCourseData);

	const [errorMessages, setErrorMessages] = useState<ErrorMessages>({});

	const handleNewCourseDataChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setNewCourseData((prevValues) => {
			return { ...prevValues, [e.target.name]: e.target.value };
		});
	};

	const addAuthorName = (authorID: string): void => {
		const author = authorsList.find((author) => author.id === authorID);

		setNewCourseAuthors([...newCourseAuthors, author]);

		setNewCourseData((prevValues) => {
			return {
				...prevValues,
				authors: [...newCourseAuthors.map((author) => author.id), author.id],
			};
		});
	};

	const deleteAuthorName = (authorID: string): void => {
		const removedAuthors = newCourseAuthors.filter(
			(author) => author.id !== authorID
		);

		setNewCourseAuthors(removedAuthors);
		setNewCourseData((prevValues) => {
			return {
				...prevValues,
				authors: removedAuthors.map((author) => author.id),
			};
		});
	};

	const createNewAuthor = (): void => {
		const createdAuthorInfo = { name: newAuthor };

		dispatch(addAuthor(createdAuthorInfo));
		setNewAuthor('');
	};

	const handleFormSubmit = () => {
		const errors = validateInputValues(newCourseData, {});

		setErrorMessages(errors);

		if (Object.keys(errors).length === 0) {
			newCourseData.duration = Number(newCourseData.duration);

			dispatch(addCourse(newCourseData));
			navigate('/courses');
		}
	};
	const handleUpdateButtonClick = () => {
		newCourseData.duration = Number(newCourseData.duration);
		const courseData = {
			newCourseData: newCourseData,
			courseId: courseId,
		};
		console.log(courseData);
		dispatch(updateCourse(courseData));
		navigate('/courses');
	};

	return (
		<div className={style.createCourseWrapper}>
			<h2 className={style.sectionTitle}>Course edit/create page</h2>

			<form action=''>
				<div className={style.section}>
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
					<div className='flex justify-between'>
						<div>
							<h3 className={style.availableAuthorsTitle}>Authors</h3>
							<div className='flex items-end gap-x-4'>
								<FormFieldWithError
									type='text'
									labelText='Author Name'
									placeholderText='Author Name'
									name='author'
									value={newAuthor}
									inputID='author'
									onChange={(e) => setNewAuthor(e.target.value)}
								/>
								<Button text='create author' onClick={createNewAuthor} />
							</div>
						</div>

						<div className={style.newCourseAuthorsContainer}>
							<h3 className='text-2xl font-bold'>Course Authors</h3>
							{newCourseAuthors.length
								? newCourseAuthors.map((authorName) => {
										return (
											<AuthorItem
												key={authorName.id}
												id={authorName.id}
												authorName={authorName.name}
												type='delete'
												editAuthorList={deleteAuthorName}
											/>
										);
									})
								: 'Author list is empty'}
							<ErrorMessage errorMessage={errorMessages.authors} />
						</div>
					</div>

					<div className='flex flex-col gap-y-4'>
						<h4 className='font-bold'>Authors List</h4>
						{authorsList.map((author) => {
							return (
								<AuthorItem
									key={author.id}
									id={author.id}
									authorName={author.name}
									editAuthorList={addAuthorName}
								/>
							);
						})}
					</div>
				</div>

				<div className='flex gap-x-5 justify-end'>
					<Link to='/courses'>
						<Button text='cancel' onClick={() => {}} />
					</Link>
					{location.pathname === '/courses/add' ? (
						<Button text='create course' onClick={handleFormSubmit} />
					) : (
						<Button text='update course' onClick={handleUpdateButtonClick} />
					)}
				</div>
			</form>
		</div>
	);
};
