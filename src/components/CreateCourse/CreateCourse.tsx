import React, { useState } from 'react';

import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { Textarea } from '../../common/Textarea/Textarea';
import { AuthorItem } from './AuthorItem/AuthorItem';

import { v4 as uuidv4 } from 'uuid';

import { getCourseDuration } from '../../helpers/getCourseDuration';

const style = {
	sectionTitle: `text-[#333E48] font-bold text-3xl mb-6 capitalize`,
	section: `border-[#CFCFCF] border bg-white rounded py-10 px-20 flex flex-col gap-y-8 mb-8`,
};

export const CreateCourse = ({
	authorsList,
	toggleCourseForm,
	setCoursesList,
	setAuthorsList,
}) => {
	const [addedAuthors, setAddedAuthors] = useState([]);
	const [renderedAuthors, setRenderedAuthors] = useState(authorsList);
	const [authorToCreate, setAuthorToCreate] = useState('');

	const initialCourseCreationData = {
		id: uuidv4(),
		title: '',
		description: '',
		creationDate: new Date().toLocaleString(),
		duration: undefined,
		authors: [],
	};

	const [courseCreationData, setCourseCreationData] = useState(
		initialCourseCreationData
	);

	const handleCourseCreationDataChange = (e) => {
		setCourseCreationData((prevValues) => {
			return { ...prevValues, [e.target.name]: e.target.value };
		});
	};

	const addAuthorName = (authorID: string) => {
		const author = authorsList.find(
			(initialAuthor) => initialAuthor.id === authorID
		);

		setAddedAuthors([...addedAuthors, author]);

		setCourseCreationData((prevValues) => {
			return {
				...prevValues,
				authors: [...addedAuthors.map((author) => author.id), author.id],
			};
		});

		const deletedAuthors = renderedAuthors.filter(
			(author) => author.id !== authorID
		);
		setRenderedAuthors(deletedAuthors);
	};

	const deleteAuthorName = (authorID: string) => {
		const author = addedAuthors.find((author) => author.id === authorID);

		setRenderedAuthors([...renderedAuthors, author]);

		const deletedAuthors = addedAuthors.filter(
			(author) => author.id !== authorID
		);

		setAddedAuthors(deletedAuthors);
		setCourseCreationData((prevValues) => {
			return {
				...prevValues,
				authors: deletedAuthors.map((author) => author.id),
			};
		});
	};

	const createAuthor = () => {
		const createdAuthorInfo = { id: uuidv4(), name: authorToCreate };
		setAuthorsList((prevValues) => [...prevValues, createdAuthorInfo]);
		setRenderedAuthors((prevValues) => [...prevValues, createdAuthorInfo]);
		setAuthorToCreate('');
	};

	const createCourse = () => {
		setCoursesList((prevValues) => [...prevValues, courseCreationData]);
		toggleCourseForm();
	};

	return (
		<div>
			<h2 className={style.sectionTitle}>Course edit/create page</h2>

			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
				action=''
			>
				<div className={style.section}>
					<h3 className='text-2xl font-bold'>Main Info</h3>

					<Input
						type='text'
						labelText='Title'
						placeholderText='Course Titlte'
						name='title'
						value={courseCreationData.title}
						inputID='courseName'
						onChange={handleCourseCreationDataChange}
					/>

					<Textarea
						labelText='Description'
						placeholderText='Description'
						name='description'
						textareaID='description'
						onChange={handleCourseCreationDataChange}
					/>

					<div className='flex items-center gap-x-4'>
						<Input
							type='number'
							labelText='Duration'
							placeholderText='Duration'
							name='duration'
							value={courseCreationData.duration}
							inputID='duration'
							onChange={handleCourseCreationDataChange}
						/>
						<p>
							{courseCreationData.duration
								? getCourseDuration(courseCreationData.duration)
								: '00:00 hours'}
						</p>
					</div>
					<div className='flex justify-between'>
						<div>
							<h3 className='text-2xl font-bold mb-6'>Authors</h3>
							<div className='flex items-end gap-x-4'>
								<Input
									type='text'
									labelText='Author Name'
									placeholderText='Author Name'
									name='author'
									value={authorToCreate}
									inputID='author'
									onChange={(e) => setAuthorToCreate(e.target.value)}
								/>
								<Button text='create author' onClick={createAuthor} />
							</div>
						</div>

						<div className='max-w-[20%] flex flex-col gap-y-4 text-center'>
							<h3 className='text-2xl font-bold'>Course Authors</h3>
							{addedAuthors.length
								? addedAuthors.map((authorName) => {
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
						</div>
					</div>

					<div className='flex flex-col gap-y-4'>
						<h4 className='font-bold'>Authors List</h4>
						{renderedAuthors.map((author) => {
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
					<Button
						text='cancel'
						onClick={() => {
							toggleCourseForm();
						}}
					/>
					<Button text='create course' onClick={createCourse} />
				</div>
			</form>
		</div>
	);
};
