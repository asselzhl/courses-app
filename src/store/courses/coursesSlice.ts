import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { createRequest } from '../../helpers/apiServices';

interface CoursesListItem {
	title: string;
	description: string;
	duration: number;
	authors: string[];
}

export const fetchCourses = createAsyncThunk('fetchCourses', async () => {
	return createRequest('http://localhost:4000/courses/all', 'GET');
});

export const deleteCourse = createAsyncThunk(
	'deleteCourse',
	async (courseId: string) => {
		return createRequest(`http://localhost:4000/courses/${courseId}`, 'DELETE');
	}
);

export const addCourse = createAsyncThunk(
	'addCourse',
	async (newCourseData: CoursesListItem) => {
		return createRequest(
			'http://localhost:4000/courses/add',
			'POST',
			newCourseData
		);
	}
);

export const coursesSlice = createSlice({
	name: 'courses',
	initialState: {
		status: 'idle',
		data: [],
		error: null,
		filteredCourses: [],
	},
	reducers: {
		// createCourse: (state, action) => {
		// 	state.data.push(action.payload);
		// 	state.filteredCourses.push(action.payload);
		// },
		removeCourse: (state, action) => {
			state.data = state.data.filter((course) => course.id !== action.payload);
			state.filteredCourses = state.filteredCourses.filter(
				(course) => course.id !== action.payload
			);
		},
		searchCourse: (state, action) => {
			const filteredCourses = state.data.filter(
				(course) =>
					course.title
						.toLowerCase()
						.includes(action.payload.toLowerCase().trim()) ||
					course.id.toLowerCase().includes(action.payload.toLowerCase().trim())
			);
			return {
				...state,
				filteredCourses:
					action.payload.length > 0 ? filteredCourses : [...state.data],
			};
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
				state.filteredCourses = action.payload.result;
			})
			.addCase(fetchCourses.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
		// .addCase(addCourse.fulfilled, (state, action) => {
		// 	state.data = [...state.data, action.payload.result];
		// });
	},
});

export const { removeCourse, searchCourse } = coursesSlice.actions;

export default coursesSlice.reducer;
