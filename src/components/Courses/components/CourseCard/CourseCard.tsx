import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../../../../common/Button/Button';
import { AppDispatch } from 'src/store';
import { getCurrentUserRole } from '../../../../store/selectors';
import { userRoles } from '../../../../store/slices/constants';
import { deleteCourse } from '../../../../store/thunks/coursesThunk';

const style = {
	courseCardWrapper: `p-8 bg-[#FFFFFF] rounded border-l-8 border-[#333E48] shadow-lg shadow-slate-300 mb-8`,
	courseName: `text-xl font-bold leading-8 mb-2.5`,
	courseDesc: `w-[60%]`,
};

interface CourseCardProps {
	id: string;
	courseName: string;
	duration: string;
	creationDate: string;
	description: string;
	authors: string;
}

export const CourseCard = ({
	id,
	courseName,
	duration,
	creationDate,
	description,
	authors,
}: CourseCardProps) => {
	const config = [
		{ title: 'Authors: ', value: authors },
		{ title: 'Duration: ', value: duration },
		{ title: 'Created: ', value: creationDate },
	];
	const dispatch = useDispatch<AppDispatch>();

	const currentUserRole = useSelector(getCurrentUserRole);

	const handleDeleteButton = () => {
		dispatch(deleteCourse(id));
	};

	return (
		<li className={style.courseCardWrapper}>
			<h3 className={style.courseName}>{courseName}</h3>
			<div className='flex gap-x-12'>
				<div className={style.courseDesc}>
					<p>{description}</p>
				</div>

				<div className='w-[310px]'>
					<div className='mb-8'>
						{config.map((infoItem, index) => (
							<p className='truncate' key={index}>
								<span className='font-bold'>{infoItem.title}</span>
								<span>{infoItem.value}</span>
							</p>
						))}
					</div>
					<div className='flex gap-3 items-center flex-wrap'>
						<Link to={id}>
							<Button text='show course' onClick={() => {}} />
						</Link>
						{currentUserRole === userRoles.admin ? (
							<>
								<Button text='delete' onClick={handleDeleteButton} />
								<Link to={`update/${id}`}>
									<Button text='update' onClick={() => {}} />
								</Link>
							</>
						) : null}
					</div>
				</div>
			</div>
		</li>
	);
};
