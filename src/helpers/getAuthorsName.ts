export function getAuthorsName(authorsIDs, authorsList) {
    return authorsIDs.map((authorID) => {
        return authorsList.find((author) => {
            return author.id === authorID;
        }).name;
    }).join(', ')
}
