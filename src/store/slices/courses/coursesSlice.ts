import { createSlice } from '@reduxjs/toolkit';
import { fetchCourses } from '../../thunks/coursesThunk';
import { StateStatus, Error } from '../types';
import { stateStatus } from '../constants';
import { handlePending, handleRejected } from '../reducersUtils';


interface CoursesListItem {
	title: string;
	description: string;
	duration: number;
	authors: string[];
	creationDate: string;
	id: string;
}

interface CoursesState {
	status: StateStatus;
	data: CoursesListItem[];
	error: Error;
}

const initialState: CoursesState = {
	status: stateStatus.idle,
	data: [],
	error: null,
};

export const coursesSlice = createSlice({
	name: 'courses',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCourses.pending, handlePending)
			.addCase(fetchCourses.fulfilled, (state, action) => {
				state.status = stateStatus.succeeded;
				state.data = action.payload.data.result;
			})
			.addCase(fetchCourses.rejected, handleRejected);
	},
});

export default coursesSlice.reducer;
