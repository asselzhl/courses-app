import { createAsyncThunk } from '@reduxjs/toolkit';
import { agent, endpoints } from './apiConfig/apiConfig';

interface NewAuthor {
    name: string;
}

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
        try {
            const data = await agent.post(endpoints.authors.addAuthor, newAuthor);
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);