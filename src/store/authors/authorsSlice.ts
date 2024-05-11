import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { createRequest } from '../../helpers/apiServices';

export const fetchAuthors = createAsyncThunk('fetchAuthors', async () => {
	return createRequest('http://localhost:4000/authors/all', 'GET');
});

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
				state.data = action.payload.result;
			})
			.addCase(fetchAuthors.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const { createAuthor } = authorsSlice.actions;

export default authorsSlice.reducer;
