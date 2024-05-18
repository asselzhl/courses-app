import { createSlice } from '@reduxjs/toolkit';

import { fetchCourses } from '../thunks';

export const coursesSlice = createSlice({
	name: 'courses',
	initialState: {
		status: 'idle',
		data: [],
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCourses.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchCourses.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.data = action.payload.data.result;
			})
			.addCase(fetchCourses.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export default coursesSlice.reducer;
