import { createSlice } from '@reduxjs/toolkit';

import { StateStatus, Error } from '../types';
import { stateStatus } from '../constants';
import { handlePending, handleRejected } from '../reducersUtils';
import { addAuthor, fetchAuthors } from '../../thunks/authorsThunk';

interface AuthorsListItem {
	name: string;
	id: string;
}

interface AuthorsState {
	status: StateStatus;
	data: AuthorsListItem[];
	error: Error;
}

const initialState: AuthorsState = {
	status: stateStatus.idle,
	data: [],
	error: null,
};

export const authorsSlice = createSlice({
	name: 'authors',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAuthors.pending, handlePending)
			.addCase(fetchAuthors.fulfilled, (state, action) => {
				state.status = stateStatus.succeeded;
				state.data = action.payload.data.result;
			})
			.addCase(fetchAuthors.rejected, handleRejected)
			.addCase(addAuthor.pending, handlePending)
			.addCase(addAuthor.fulfilled, (state, action) => {
				state.status = stateStatus.succeeded;
				state.data.push(action.payload.data.result);
				return state;
			})
			.addCase(addAuthor.rejected, handleRejected);
	},
});

export default authorsSlice.reducer;
