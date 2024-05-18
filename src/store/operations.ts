import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface CoursesListItem {
	title: string;
	description: string;
	duration: number | string;
	authors: string[];
}
interface UpdateCourseProps {
	newCourseData: CoursesListItem;
	courseId: string;
}
interface NewAuthor {
	name: string;
}

const urls = {
	baseURL: 'http://localhost:4000/',
	coursesURL: 'http://localhost:4000/courses/',
	authorsURL: 'http://localhost:4000/authors/',
};
const endpoints = {
	auth: {
		login: `${urls.baseURL}login`,
		register: `${urls.baseURL}register`,
		logout: `${urls.baseURL}logout`,
	},
	courses: {
		getCourses: `${urls.coursesURL}all`,
		addCourse: `${urls.coursesURL}add`,
	},
	authors: {
		getAuthors: `${urls.authorsURL}all`,
		addAuthor: `${urls.authorsURL}add`,
	},
	users: {
		getUser: `${urls.baseURL}users/me`,
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

const agent = axios.create();

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
	async (courseData: UpdateCourseProps, thunkApi) => {
		const userToken = getUserToken();
		try {
			const data = await agent.put(
				`${urls.coursesURL}${courseData.courseId}`,
				courseData.newCourseData,
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
			const data = await agent.delete(`${urls.coursesURL}${courseId}`, {
				headers: { Authorization: userToken },
			});
			return data;
		} catch (error) {
			return thunkApi.rejectWithValue(error);
		}
	}
);

export const fetchAuthors = createAsyncThunk(
	'fetchAuthors',
	async (_, thunkApi) => {
		try {
			const data = await agent.get(endpoints.authors.getAuthors);
			return data;
		} catch (error) {
			return thunkApi.rejectWithValue(error);
		}
	}
);

export const addAuthor = createAsyncThunk(
	'addAuthor',
	async (newAuthor: NewAuthor, thunkApi) => {
		const userToken = getUserToken();
		try {
			const data = await agent.post(endpoints.authors.addAuthor, newAuthor, {
				headers: { Authorization: userToken },
			});
			return data;
		} catch (error) {
			return thunkApi.rejectWithValue(error);
		}
	}
);
