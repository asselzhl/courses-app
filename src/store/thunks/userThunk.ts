import { createAsyncThunk } from '@reduxjs/toolkit';
import { agent, endpoints } from './apiConfig/apiConfig';

interface UserData {
	email: string;
	password: string;
}

export const authenticateUser = createAsyncThunk(
	'authenticateUser',
	async (userData: UserData, thunkApi) => {
		try {
			const data = await agent.post(endpoints.auth.login, userData);
			return data;
		} catch (error) {
			return thunkApi.rejectWithValue(error);
		}
	}
);

export const logUserOut = createAsyncThunk(
	'logUserOut',
	async (_, thunkApi) => {
		try {
			const data = await agent.delete(endpoints.auth.logout);
			return data;
		} catch (error) {
			return thunkApi.rejectWithValue(error);
		}
	}
);

export const getCurrentUser = createAsyncThunk(
	'getCurrentUser',
	async (_, thunkApi) => {
		try {
			const data = await agent.get(endpoints.users.getUser);
			return data;
		} catch (error) {
			return thunkApi.rejectWithValue(error);
		}
	}
);
