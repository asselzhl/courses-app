import React from 'react';
import { Button } from '../../../common/Button/Button';
import { FormFieldWithError } from '../../../common/FormFieldWithError/FormFieldWithError';
import { AuthorItem } from '../AuthorItem/AuthorItem';
import { ErrorMessage } from '../../../common/ErrorMessage/ErrorMessage';
import { useSelector } from 'react-redux';
import { getAuthorsList } from '../../../store/selectors';

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

export const CourseAuthors = ({
	newAuthor,
	setNewAuthor,
	createNewAuthor,
	addAuthorName,
	newCourseAuthors,
	deleteAuthorName,
	errorMessages,
}) => {
	const authorsList = useSelector(getAuthorsList);
	return (
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
	);
};
