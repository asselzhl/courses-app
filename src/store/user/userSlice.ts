import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { createRequest } from '../../helpers/apiServices';
interface UserData {
	email: string;
	password: string;
}

export const authenticateUser = createAsyncThunk(
	'authenticateUser',
	async (userData: UserData) => {
		return createRequest('http://localhost:4000/login', 'POST', userData);
	}
);
export const logUserOut = createAsyncThunk('logUserOut', async () => {
	return createRequest('http://localhost:4000/logout', 'DELETE');
});

export const getCurrentUser = createAsyncThunk('getCurrentUser', async () => {
	return createRequest('http://localhost:4000/users/me', 'GET');
});

type UserStatus = 'idle' | 'loading' | 'succeded' | 'failed';

type Error = null | string;

interface UserState {
	status: UserStatus;
	error: Error;
	isAuth: boolean;
	name: string;
	email: string;
	token: string;
	role: string;
}

interface ServerResponse {
	successful: boolean;
	result: string;
	user?: {
		name: string;
		email: string;
	};
}

const initialState: UserState = {
	status: 'idle',
	error: null,
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
};

const adminCredentials = {
	email: 'admin@email.com',
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(authenticateUser.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(
				authenticateUser.fulfilled,
				(state, action: PayloadAction<ServerResponse>) => {
					state.role = 'user';
					state.status = 'succeded';
					state.isAuth = true;
					state.name = action.payload.user.name;
					state.email = action.payload.user.email;
					state.token = action.payload.result;

					if (action.payload.user.email === adminCredentials.email) {
						state.role = 'admin';
					}
				}
			)
			.addCase(authenticateUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(logUserOut.fulfilled, (state) => {
				state.isAuth = false;
				state.name = '';
				state.email = '';
				state.token = '';
			})
			.addCase(getCurrentUser.fulfilled, (state, action) => {
				state.name = action.payload.result.name;
				state.email = action.payload.result.email;
				state.role = action.payload.result.role;
				state.isAuth = true;
			});
	},
});

export default userSlice.reducer;
