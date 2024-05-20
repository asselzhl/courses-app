import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const newCourseAuthorsSlice = createSlice({
	name: 'newCourseAuthors',
	initialState,
	reducers: {
		setNewCourseAuthors: (state, action) => {
			state.push(action.payload);
			return state;
		},
	},
});

export const newCourseAuthorsReducer = newCourseAuthorsSlice.reducer;
export const { setNewCourseAuthors } = newCourseAuthorsSlice.actions;
