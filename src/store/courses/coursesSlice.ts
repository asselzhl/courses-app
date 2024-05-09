import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// interface CoursesListItem {
// 	id: string;
// 	title: string;
// 	description: string;
// 	creationDate: string;
// 	duration: number;
// 	authors: string[];
// }

export const fetchCourses = createAsyncThunk('fetchCourses', async () => {
	const data = await fetch('http://localhost:4000/courses/all');
	return data.json();
});

// export const addCourse = createAsyncThunk('addCourse', async (newCourseData: CoursesListItem) => {
// 	const data = await fetch('http://localhost:4000/courses/add', {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 		body: JSON.stringify(newCourseData),
// 	});
// 	return data.json();
// })

export const coursesSlice = createSlice({
	name: 'courses',
	initialState: {
		status: 'idle',
		data: [],
		error: null,
	},
	reducers: {
		createCourse: (state, action) => {
			state.data.push(action.payload);
		},
		removeCourse: (state, action) => {
			state.data = state.data.filter((course) => course.id !== action.payload);
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

export const { createCourse, removeCourse } = coursesSlice.actions;

export default coursesSlice.reducer;
