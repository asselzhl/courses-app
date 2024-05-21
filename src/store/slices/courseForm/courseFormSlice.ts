import { createSlice } from '@reduxjs/toolkit';
interface CoursesListItem {
	title: string;
	description: string;
	duration;
	authors: string[];
}

const initialState: CoursesListItem = {
	title: '',
	description: '',
	duration: '',
	authors: [],
};

export const courseFormSlice = createSlice({
	name: 'newCourse',
	initialState,
	reducers: {
		setCourseFormData: (state, action) => {
			const { payload } = action;

			if (
				payload.duration !== undefined &&
				typeof payload.duration !== 'number'
			) {
				payload.duration = Number(payload.duration);
			}
			return { ...state, ...payload };
		},
		clearCourseFormData: (state) => {
			state = initialState;
			return state;
		},
		setCourseFormAuthors: (state, action) => {
			state.authors.push(action.payload);
			return state;
		},
		removeCourseFormAuthors: (state, action) => {
			state.authors = state.authors.filter(
				(authorID) => authorID !== action.payload
			);
			return state;
		},
	},
});

export const courseFormReducer = courseFormSlice.reducer;
export const {
	setCourseFormData,
	clearCourseFormData,
	setCourseFormAuthors,
	removeCourseFormAuthors,
} = courseFormSlice.actions;
