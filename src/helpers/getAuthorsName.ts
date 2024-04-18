interface AuthorInfo {
	id: string;
	name: string;
}

export function getAuthorsName(authorsIDs: string[], authorsList: AuthorInfo[]) {
	return authorsIDs
		.map((authorID: string) => {
			return authorsList.find((author) => author.id === authorID).name;
		})
		.join(', ');
}
