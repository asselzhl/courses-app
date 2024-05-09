import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCourses = createAsyncThunk('fetchCourses', async () => {
	const data = await fetch('http://localhost:4000/courses/all');
	return data.json();
});

export const coursesSlice = createSlice({
	name: 'courses',
	initialState: {
		status: 'idle',
		data: [],
		error: null,
	},
	reducers: {
		addCourse: (state, action) => {
			state.data.push(action.payload);
		},
		removeCourse: (state, action) => {
			state.data = state.data.filter(
				(course) => course.id! !== action.payload.id
			);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCourses.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchCourses.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.data = action.payload.result;
			})
			.addCase(fetchCourses.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const { addCourse, removeCourse } = coursesSlice.actions;

export default coursesSlice.reducer;
