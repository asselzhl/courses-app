import React from 'react';

import { Button } from '../../common/Button/Button';

const style = {
	title: `text-[#333E48] font-bold text-3xl mb-6`,
	body: `border-[#CFCFCF] border bg-white py-14 px-16 rounded mb-12`,
	subtitle: `text-[#333E48] text-xl font-bold mb-6`,
	line: `w-[1px] bg-[#CFCFCF]`,
	info: `w-[50%] flex flex-col gap-y-4`,
	content: `flex gap-x-8`,
	infoText: `flex justify-between text-[#333E48]`
};

export const CourseInfo = ({
	courseName,
	description,
	id,
	duration,
	creationDate,
	authors,
	toggleCourseInfo,
}) => {
	return (
		<div>
			<h2 className={style.title}>{courseName}</h2>
			<div className={style.body}>
				<h3 className={style.subtitle}>Description:</h3>
				<div className={style.content}>
					<div className='w-[50%]'>
						<p>{description}</p>
					</div>
					<div className={style.line}></div>
					<div className={style.info}>
						<p className={style.infoText}>
							<span className='font-bold'>ID: </span>
							<span>{id}</span>
						</p>
						<p className={style.infoText}>
							<span className='font-bold'>Duration: </span>
							<span>{duration}</span>
						</p>
						<p className={style.infoText}>
							<span className='font-bold'>Created: </span>
							<span>{creationDate}</span>
						</p>
						<p className={style.infoText}>
							<span className='font-bold'>Authors: </span>
							<span>{authors}</span>
						</p>
					</div>
				</div>
			</div>
			<div className='text-right'>
				<Button text='back' onClick={toggleCourseInfo} />
			</div>
		</div>
	);
};
