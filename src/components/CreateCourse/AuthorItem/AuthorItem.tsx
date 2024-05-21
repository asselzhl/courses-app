import React from 'react';

import addButton from './assets/add.svg';
import deleteButton from './assets/delete.svg';

type AuthorItemKeys = 'add' | 'delete';

const authorItemMap: Record<AuthorItemKeys, { src: string }> = {
	add: {
		src: addButton,
	},
	delete: {
		src: deleteButton,
	},
};

interface AuthorItemProps {
	id: string;
	authorName: string;
	type?: AuthorItemKeys;
	editAuthorList: (id: string) => void;
}

export const AuthorItem = ({
	id,
	authorName,
	type = 'add',
	editAuthorList,
}: AuthorItemProps) => {
	const config = authorItemMap[type];

	const handleButtonClick = (e) => {
		e.preventDefault();
		editAuthorList(id);
	};
	return (
		<div className='flex gap-x-3 items-center'>
			<p className='min-w-[150px]'>{authorName}</p>
			<button onClick={handleButtonClick}>
				<img src={config.src} alt='' />
			</button>
		</div>
	);
};
