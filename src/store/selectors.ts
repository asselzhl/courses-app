import { RootState } from '.';
import { createSelector } from '@reduxjs/toolkit';

export const getUserData = (state: RootState) => {
	return state.user;
};

export const getCoursesData = (state: RootState) => {
	return state.courses;
};

export const getAuthorsData = (state: RootState) => {
	return state.authors;
};

export const getFilterValue = (state: RootState) => state.filter;

export const getFilteredCourses = createSelector(
	[getCoursesData, getFilterValue],
	(courses, filterValue) => {
		return courses.data.filter(
			(course) =>
				course.title.toLowerCase().includes(filterValue.toLowerCase().trim()) ||
				course.id.toLowerCase().includes(filterValue.toLowerCase().trim())
		);
	}
);
