import { createSlice } from '@reduxjs/toolkit';

import { fetchAuthors } from '../operations';

export const authorsSlice = createSlice({
	name: 'authors',
	initialState: {
		status: 'idle',
		data: [],
		error: null,
	},
	reducers: {
		createAuthor: (state, action) => {
			state.data.push(action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAuthors.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchAuthors.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.data = action.payload.data.result;
			})
			.addCase(fetchAuthors.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const { createAuthor } = authorsSlice.actions;

export default authorsSlice.reducer;
