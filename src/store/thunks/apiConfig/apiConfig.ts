import axios from 'axios';
import { store } from '../..';

export const endpoints = {
	auth: {
		login: '/login',
		register: '/register',
		logout: '/logout',
	},
	courses: {
		base: '/courses/',
		getCourses: '/courses/all',
		addCourse: '/courses/add',
	},
	authors: {
		base: 'authors/',
		getAuthors: '/authors/all',
		addAuthor: '/authors/add',
	},
	users: {
		getUser: `/users/me`,
	},
};

const getUserToken = () => {
	const state = store.getState();
	const userData = state.user;
	if (userData && userData.token) {
		let userToken = userData.token.replace(/\\"/g, '"');

		if (userToken.startsWith('"') && userToken.endsWith('"')) {
			userToken = userToken.slice(1, -1);
		}

		return userToken;
	}
	return null;
};

export const agent = axios.create({
	baseURL: 'http://localhost:4000'
});

agent.interceptors.request.use(config => {
	const userToken = getUserToken();

	if (userToken) {
		config.headers.Authorization = userToken;
	}
	return config;
});