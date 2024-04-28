interface CoursesListItem {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
}
interface ErrorMessages {
	[key: string]: string;
}

export function validateInputValues(
	values: CoursesListItem,
	errorMessages: ErrorMessages
): ErrorMessages {
	for (const field in values) {
		const fieldName = field[0].toUpperCase() + field.slice(1);

		if (Array.isArray(values[field]) && values[field].length === 0) {
			errorMessages[field] = `${fieldName} field is required.`;
		} else if (!values[field]) {
			errorMessages[field] = `${fieldName} field is required.`;
		}
	}
	return errorMessages;
}
