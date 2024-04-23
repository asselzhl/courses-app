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

export const CreateCourse = ({ mockedAuthorsList, toggleCourseForm }) => {
	const [initialAuthors, setInitialAuthors] = useState(mockedAuthorsList);
	const [addedAuthors, setAddedAuthors] = useState([]);

	const [authorToCreate, setAuthorToCreate] = useState('');

	const initialCourseCreationData = {
		id: '',
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
		const author = initialAuthors.find(
			(initialAuthor) => initialAuthor.id === authorID
		);

		setAddedAuthors([...addedAuthors, author]);

		setCourseCreationData((prevValues) => {
			return { ...prevValues, authors: addedAuthors };
		});

		const deletedAuthors = initialAuthors.filter(
			(author) => author.id !== authorID
		);
		setInitialAuthors(deletedAuthors);
	};

	const deleteAuthorName = (authorID: string) => {
		const author = addedAuthors.find((author) => author.id === authorID);

		setInitialAuthors([...initialAuthors, author]);

		const deletedAuthors = addedAuthors.filter(
			(author) => author.id !== authorID
		);

		setAddedAuthors(deletedAuthors);

		setCourseCreationData((prevValues) => {
			return { ...prevValues, authors: deletedAuthors };
		});
	};

	const createAuthor = () => {
		mockedAuthorsList.push({
			id: uuidv4(),
			name: authorToCreate,
		});
		setAuthorToCreate('');
	};
	console.log(courseCreationData);
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
						{initialAuthors.map((author) => {
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
						onClick={(e) => {
							e.preventDefault();
							toggleCourseForm();
						}}
					/>
					<Button
						text='create course'
						onClick={(e) => {
							e.preventDefault();
						}}
					/>
				</div>
			</form>
		</div>
	);
};
