import { createAsyncThunk } from '@reduxjs/toolkit';
import { agent, endpoints } from './apiConfig/apiConfig';

interface CoursesListItem {
	title: string;
	description: string;
	duration: number;
	authors: string[];
}

interface UpdateCourseProps {
	courseData: CoursesListItem;
	courseId: string;
}

export const fetchCourses = createAsyncThunk(
	'fetchCourses',
	async (_, thunkApi) => {
		try {
			const data = await agent.get(endpoints.courses.getCourses);
			return data;
		} catch (error) {
			return thunkApi.rejectWithValue(error);
		}
	}
);

export const addCourse = createAsyncThunk(
	'addCourse',
	async (courseFormData: CoursesListItem, thunkApi) => {
		try {
			const data = await agent.post(
				endpoints.courses.addCourse,
				courseFormData
			);
			return data;
		} catch (error) {
			return thunkApi.rejectWithValue(error);
		}
	}
);

export const updateCourse = createAsyncThunk(
	'updateCourse',
	async (updatedCourseData: UpdateCourseProps, thunkApi) => {
		const endpoint = endpoints.courses.base + updatedCourseData.courseId;
		try {
			const data = await agent.put(endpoint, updatedCourseData.courseData);
			return data;
		} catch (error) {
			return thunkApi.rejectWithValue(error);
		}
	}
);

export const deleteCourse = createAsyncThunk(
	'deleteCourse',
	async (courseId: string, thunkApi) => {
		const endpoint = endpoints.courses.base + courseId;
		try {
			const data = await agent.delete(endpoint);
			return data;
		} catch (error) {
			return thunkApi.rejectWithValue(error);
		}
	}
);
