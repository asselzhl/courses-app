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
		filteredCourses: [],
	},
	reducers: {
		createCourse: (state, action) => {
			state.data.push(action.payload);
			state.filteredCourses.push(action.payload);
		},
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
	},
});

export const { createCourse, removeCourse, searchCourse } =
	coursesSlice.actions;

export default coursesSlice.reducer;
