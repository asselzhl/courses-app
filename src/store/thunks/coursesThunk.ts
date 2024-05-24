import { createAsyncThunk } from '@reduxjs/toolkit';
import { agent, endpoints } from './apiConfig/apiConfig';

interface CoursesListItem {
    title: string;
    description: string;
    duration: number;
    authors: string[];
}

interface UpdateCourseProps {
    courseFormData: CoursesListItem;
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
    async (courseData: UpdateCourseProps, thunkApi) => {
        try {
            const data = await agent.put(
                `${endpoints.courses.base}${courseData.courseId}`,
                courseData.courseFormData
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
        try {
            const data = await agent.delete(`${endpoints.courses.base}${courseId}`);
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);