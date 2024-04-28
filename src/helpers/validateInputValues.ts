export function validateInputValues(values, errorMessages) {
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
