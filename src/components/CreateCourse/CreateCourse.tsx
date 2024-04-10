import React, { useState } from 'react';

import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { Textarea } from '../../common/Textarea/Textarea';
import { AuthorItem } from './AuthorItem/AuthorItem';

export const CreateCourse = ({ mockedAuthorsList, toggleCourseForm }) => {
	const [authorNames, setAuthorNames] = useState<string[]>([]);

	const getAuthorInfo = (authorID) => {
		const authorName = mockedAuthorsList.find(
			(author) => author.id === authorID
		).name;

		setAuthorNames([...authorNames, authorName]);
	};

	return (
		<div>
			<h2 className='text-[#333E48] font-bold text-3xl mb-6 capitalize'>
				Course edit/create page
			</h2>

			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
				action=''
			>
				<div className='border-[#CFCFCF] border bg-white rounded py-10 px-20 flex flex-col gap-y-8 mb-8'>
					<h3 className='text-2xl font-bold'>Main Info</h3>

					<div>
						<Input
							type='text'
							labelText='Title'
							placeholderText='Course Titlte'
							inputID='courseName'
							onChange={() => {}}
						/>
					</div>

					<div>
						<Textarea
							labelText='Description'
							placeholderText='Description'
							textareaID='description'
							onChange={() => {}}
						/>
					</div>

					<div className='flex items-center gap-x-4'>
						<Input
							type='number'
							labelText='Duration'
							placeholderText='Duration'
							inputID='duration'
							onChange={() => {}}
						/>
						<p>
							<span>00:00 </span>
							<span>hours</span>
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
									inputID='author'
									onChange={() => {}}
								/>
								<Button
									text='create author'
									onClick={(e) => {
										e.preventDefault();
									}}
								/>
							</div>
						</div>

						<div className='max-w-[20%]'>
							<h3 className='text-2xl font-bold'>Course Authors</h3>
							{authorNames.map((authorName) => {
								return <p>{authorName}</p>;
							})}
						</div>
					</div>

					<div className='flex flex-col gap-y-4'>
						<h4 className='font-bold'>Authors List</h4>
						{mockedAuthorsList.map((author) => {
							return (
								<AuthorItem
									key={author.id}
									id={author.id}
									authorName={author.name}
									getAuthorInfo={getAuthorInfo}
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
