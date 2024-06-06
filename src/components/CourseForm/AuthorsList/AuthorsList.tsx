import React from 'react';
import { AuthorItem } from '../AuthorItem/AuthorItem';

type AuthorItemKeys = 'add' | 'delete';

interface AuthorsListItem {
	id: string;
	name: string;
}

interface AuthorsListProps {
	authors: AuthorsListItem[];
	type?: AuthorItemKeys;
	editAuthorList;
}

export const AuthorsList = ({
	authors,
	type = 'add',
	editAuthorList,
}: AuthorsListProps) => {
	if (!authors || authors.length === 0) {
		return <div>Author list is empty</div>;
	}
	return (
		<ul>
			{authors.map((author) => (
				<AuthorItem
					key={author.id}
					id={author.id}
					authorName={author.name}
					type={type}
					editAuthorList={editAuthorList}
				/>
			))}
		</ul>
	);
};
