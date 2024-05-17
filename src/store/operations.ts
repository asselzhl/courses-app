import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface CoursesListItem {
	title: string;
	description: string;
	duration: number | string;
	authors: string[];
}
interface UpdateCourseProps {
	courseData: CoursesListItem;
	courseId: string;
}
const baseURL = 'http://localhost:4000';
const endpoints = {
	auth: {
		login: `${baseURL}/login`,
		register: `${baseURL}/register`,
		logout: `${baseURL}/logout`,
	},
	courses: {
		getCourses: `${baseURL}/courses/all`,
		addCourse: `${baseURL}/courses/add`,
	},
	authors: {
		getAuthors: `${baseURL}/authors/all`,
		addAuthor: `${baseURL}/authors/add`,
	},
	users: {
		getUser: `${baseURL}/users/me`,
	},
};

const getUserToken = () => {
	const storedUserData = localStorage.getItem('persist:user');
	if (storedUserData) {
		const userData = JSON.parse(storedUserData);
		let userToken = userData.token.replace(/\\"/g, '"');

		if (userToken.startsWith('"') && userToken.endsWith('"')) {
			userToken = userToken.slice(1, -1);
		}

		return userToken;
	}
	return null;
};

const agent = axios.create({
	baseURL: 'http://localhost:4000/',
});

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
	async (newCourseData: CoursesListItem, thunkApi) => {
		const userToken = getUserToken();
		try {
			const data = await agent.post(
				endpoints.courses.addCourse,
				newCourseData,
				{ headers: { Authorization: userToken } }
			);
			return data;
		} catch (error) {
			return thunkApi.rejectWithValue(error);
		}
	}
);

export const updateCourse = createAsyncThunk(
	'updateCourse',
	async ({ courseData, courseId }: UpdateCourseProps, thunkApi) => {
		const userToken = getUserToken();
		try {
			const data = await agent.put(
				`${baseURL}/courses/${courseId}`,
				courseData,
				{ headers: { Authorization: userToken } }
			);
			return data;
		} catch (error) {
			return thunkApi.rejectWithValue(error);
		}
	}
);

export const deleteCourse = createAsyncThunk(
	'deleteCourse',
	async (courseId: string, thunkApi) => {
		const userToken = getUserToken();
		try {
			const data = await agent.delete(`${baseURL}/courses/${courseId}`, {
				headers: { Authorization: userToken },
			});
			return data;
		} catch (error) {
			return thunkApi.rejectWithValue(error);
		}
	}
);
