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

export const newCourseSlice = createSlice({
	name: 'newCourse',
	initialState,
	reducers: {
		setNewCourseData: (state, action) => {
			return { ...state, ...action.payload };
		},
	},
});

export const newCourseReducer = newCourseSlice.reducer;
export const { setNewCourseData } = newCourseSlice.actions;
