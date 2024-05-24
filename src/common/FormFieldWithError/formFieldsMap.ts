type InputTypes = 'text' | 'number' | 'email' | 'password';

interface FormField {
	type?: InputTypes;
	labelText: string;
	placeholderText: string;
	name: string;
	inputID: string;
}

type FormFieldNames =
	| 'title'
	| 'duration'
	| 'createAuthor'
	| 'searchCourse'
	| 'email'
	| 'password'
	| 'fullname'
	| 'description';

type FormFieldsMap = {
	[key in FormFieldNames]: FormField;
};

export const formFieldsMap: FormFieldsMap = {
	title: {
		type: 'text',
		labelText: 'Title',
		placeholderText: 'Course Title',
		name: 'title',
		inputID: 'courseName',
	},
	duration: {
		type: 'number',
		labelText: 'Duration',
		placeholderText: 'Duration',
		name: 'duration',
		inputID: 'duration',
	},
	createAuthor: {
		type: 'text',
		labelText: 'Author Name',
		placeholderText: 'Author Name',
		name: 'createAuthor',
		inputID: 'createAuthor',
	},
	searchCourse: {
		type: 'text',
		labelText: '',
		placeholderText: 'Search Course',
		name: 'searchCourse',
		inputID: 'searchCourse',
	},
	email: {
		type: 'email',
		labelText: 'Email',
		placeholderText: 'Email',
		name: 'email',
		inputID: 'email',
	},
	password: {
		type: 'password',
		labelText: 'Password',
		placeholderText: 'Password',
		name: 'password',
		inputID: 'password',
	},
	fullname: {
		type: 'text',
		labelText: 'Fullname',
		placeholderText: 'Fullname',
		name: 'fullname',
		inputID: 'fullname',
	},
	description: {
		labelText: 'Description',
		placeholderText: 'Description',
		name: 'description',
		inputID: 'description',
	},
};
