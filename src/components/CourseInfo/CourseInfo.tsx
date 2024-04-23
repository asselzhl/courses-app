import React from 'react';

import { Button } from '../../common/Button/Button';

const style = {
	title: `text-[#333E48] font-bold text-3xl mb-6`,
	body: `border-[#CFCFCF] border bg-white py-14 px-16 rounded mb-12`,
	subtitle: `text-[#333E48] text-xl font-bold mb-6`,
	line: `w-[1px] bg-[#CFCFCF]`,
	info: `w-[50%] flex flex-col gap-y-4`,
	content: `flex gap-x-8`,
	infoText: `flex justify-between text-[#333E48]`,
};

interface CourseInfoProps {
	courseName: string;
	description: string;
	id: string;
	duration: string;
	creationDate: string;
	authors: string;
	toggleCourseInfo: () => void;
}

export const CourseInfo = ({
	courseName,
	description,
	id,
	duration,
	creationDate,
	authors,
	toggleCourseInfo,
}: CourseInfoProps) => {
	const config = [
		{ title: 'ID:', value: id },
		{ title: 'Duration:', value: duration },
		{ title: 'Created:', value: creationDate },
		{ title: 'Authors:', value: authors },
	];

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
				<Button text='back' onClick={toggleCourseInfo} />
			</div>
		</div>
	);
};
