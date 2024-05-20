import { RootState } from '.';
import { createSelector } from '@reduxjs/toolkit';

// User selectors
export const getCurrentUserState = (state: RootState) => {
	return state.user;
};
export const getCurrentUserStateStatus = (state: RootState) => {
	return state.user.status;
};
export const getCurrentUserAuthStatus = (state: RootState) => {
	return state.user.isAuth;
};
export const getCurrentUserName = (state: RootState) => {
	return state.user.name;
};
export const getCurrentUserRole = (state: RootState) => {
	return state.user.role;
};

// Courses selectors
export const getCoursesState = (state: RootState) => {
	return state.courses;
};
export const getCoursesStateStatus = (state: RootState) => {
	return state.courses.status;
};
export const getCoursesList = (state: RootState) => {
	return state.courses.data;
};

// Authors selectors
export const getAuthorsState = (state: RootState) => {
	return state.authors;
};
export const getAuthorsStateStatus = (state: RootState) => {
	return state.authors.status;
};
export const getAuthorsList = (state: RootState) => {
	return state.authors.data;
};

// Filter selectors
export const getFilterValue = (state: RootState) => state.filter;

export const getFilteredCourses = createSelector(
	[getCoursesList, getFilterValue],
	(courses, filterValue) => {
		return courses.filter(
			(course) =>
				course.title.toLowerCase().includes(filterValue.toLowerCase().trim()) ||
				course.id.toLowerCase().includes(filterValue.toLowerCase().trim())
		);
	}
);
